const {DOMParser} = require('xmldom')

module.exports = function parseXmlDom(xmlDomString) {
  const domTree = _parseXml(xmlDomString)

  if (!domTree) {
    return []
  }

  let traverseNodes = [domTree]
  const nodes = []

  while (traverseNodes.length) {
    const currentNode = traverseNodes.shift()

    if (!currentNode) {
      break
    }

    const {
      children = [],
      tagName,
      attributes = {}
    } = currentNode

    nodes.push({
      tagName,
      attributes,
      location: _getLocation(attributes['bounds']),
      resourceId: attributes['resource-id'],
      text: attributes['text'],
      contentDesc: attributes['content-desc'],
      ocrText: attributes['ocrText'],
      xpath: attributes['xpath']
    })

    traverseNodes = traverseNodes.concat(children)
  }

  return nodes
}

/* Parse xml source to xml dom tree with every node in it has the below structure:
 Node:
  {
    children: [<Node>],
    tagName,
    attributes,
    path
  }
 * This code block is duplicated in src/utils/json.js in booster-automated-execution-runner,
 * we will move it to core-util later for centralizing purpose
 */
function _parseXml(source) {
  let xmlDoc
  let recursive = (xmlNode, parentPath, index) => {

    // Translate attributes array to an object
    let attributes = {}
    for (let attribute of _o2a(xmlNode.attributes) || []) {
      attributes[attribute.name] = attribute.value
    }

    attributes['xpath'] = _getAbsoluteXPath(xmlDoc, xmlNode)

    // Dot Separated path of indices
    let path = (index !== undefined) && `${!parentPath ? '' : parentPath + '.'}${index}`

    return {
      children: [..._o2a(xmlNode.childNodes)]
        .map((childNode, childIndex) => recursive(childNode, path, childIndex)),
      tagName: xmlNode.tagName,
      attributes,
      path
    }
  }

  const formattedSource = _formatXmlSource(source)
  xmlDoc = (new DOMParser()).parseFromString(formattedSource, 'text/xml')
  let sourceXML = xmlDoc.childNodes[1]
  return recursive(sourceXML)
}

/**
 * Get the absolute XPath for a DOMNode
 * @param {*} domNode {DOMNode}
 */
function _getAbsoluteXPath(doc, domNode) {
  try {
    // If this isn't an element, we're above the root, return empty string
    if (!domNode.tagName || domNode.nodeType !== 1) {
      return ''
    }

    // Get the relative xpath of this node using tagName
    let xpath = `/${domNode.tagName}`

    // If this node has siblings of the same tagName, get the index of this node
    if (domNode.parentNode) {
      // Get the siblings
      const childNodes = Array.prototype.slice
        .call(domNode.parentNode.childNodes, 0)
        .filter((childNode) => (
          childNode.nodeType === 1 && childNode.tagName === domNode.tagName
        ))

      // If there's more than one sibling, append the index
      if (childNodes.length > 1) {
        let index = childNodes.indexOf(domNode)
        xpath += `[${index + 1}]`
      }
    }

    // Make a recursive call to this nodes parents and prepend it to this xpath
    return _getAbsoluteXPath(doc, domNode.parentNode) + xpath
  }
  catch (ign) {
    // If there's an unexpected exception, abort and don't get an XPath
    console.log(ign.message)
    return null
  }
}

// There is an issue with xmldom module that it parses wrong content with
// any whitespace character between '>' and '<'. So we must remove them all
function _formatXmlSource(source) {
  return source.replace(/>(\s)*</g, '><')
}

function _o2a(o) {
  const result = []
  for (let key in o) {
    if (o.hasOwnProperty(key)) {
      const n = Number(key)
      if (!isNaN(n)) {
        result[n] = o[key]
      }
    }
  }

  return result
}

function _getLocation(bounds) {
  if (!bounds) return {}
  const array = JSON.parse(bounds.replace('][', ','))

  return {
    left: array[0],
    top: array[1],
    right: array[2],
    bottom: array[3]
  }
}

