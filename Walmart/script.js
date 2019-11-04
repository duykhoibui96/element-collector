const noop = require('lodash/noop')

/*
{
    "app": "kobiton-store:35322",
    "devices": [
        "Nexus 5",
        "Galaxy S6",
        "Galaxy C5",
        "LG K10 LTE",
        "Galaxy J2 Prime",
        "Pixel 3",
        "Xperia L1"
    ]
}
*/

module.exports = async function run(driver, save = noop) {
    let el1 = await driver.elementByAccessibilityId("Browse all departments.");
    await save('browse_departments', {value: 'Browse all departments.', key: 'ocrText'})
    await el1.click();
    let el2 = await driver.elementByXPath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/androidx.drawerlayout.widget.DrawerLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.RelativeLayout/android.widget.FrameLayout/android.widget.FrameLayout/androidx.recyclerview.widget.RecyclerView/android.widget.LinearLayout[2]/android.widget.TextView");
    await save('text_view_element', {value: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/androidx.drawerlayout.widget.DrawerLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.RelativeLayout/android.widget.FrameLayout/android.widget.FrameLayout/androidx.recyclerview.widget.RecyclerView/android.widget.LinearLayout[2]/android.widget.TextView', key: 'xpath'})
    await el2.click();
    let el3 = await driver.elementByAccessibilityId("Open navigation drawer");
    await save('drawer', {value: 'Open navigation drawer', key: 'ocrText'})
    await el3.click();
    await driver.back();
    let el4 = await driver.elementByXPath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/androidx.drawerlayout.widget.DrawerLayout/android.widget.FrameLayout[2]/android.view.ViewGroup/android.widget.RelativeLayout/android.widget.FrameLayout/android.widget.FrameLayout/androidx.recyclerview.widget.RecyclerView/android.widget.LinearLayout[5]/android.widget.TextView");
    await save('text_view_element_2', {value: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/androidx.drawerlayout.widget.DrawerLayout/android.widget.FrameLayout[2]/android.view.ViewGroup/android.widget.RelativeLayout/android.widget.FrameLayout/android.widget.FrameLayout/androidx.recyclerview.widget.RecyclerView/android.widget.LinearLayout[5]/android.widget.TextView', key: 'xpath'})
    await el4.click();
    let el5 = await driver.elementByAccessibilityId("Browse Holiday Ready.");
    await save('holiday_option', {value: 'Browse Holiday Ready.', key: 'ocrText'})
    await el5.click();
    let el6 = await driver.elementById("com.walmart.android:id/root_item_view");
    await save('item', {value: 'com.walmart.android:id/root_item_view"'})
    await el6.click();

}