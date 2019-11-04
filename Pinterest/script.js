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
    let el1
    try {
        el1 = await driver.elementById("com.pinterest:id/email_address");
    }
    catch (ignored) {
        await driver.back()
        el1 = await driver.elementById("com.pinterest:id/email_address");
    }

    await save('email_address', {value: 'com.pinterest:id/email_address'})
    await el1.click();
    await el1.sendKeys("duykhoi.bui96@gmail.com");
    let el2 = await driver.elementById("com.pinterest:id/continue_email_bt");
    await save('continue_email_bt', {value: 'com.pinterest:id/continue_email_bt'})
    await el2.click();
    let el3 = await driver.elementById("com.pinterest:id/password");
    await save('password', {value: 'com.pinterest:id/password'})
    await el3.click();
    await el3.sendKeys("Tony#1996");
    let el4 = await driver.elementById("com.pinterest:id/password_toggle_cb");
    await save('password_toggle_cb', {value: 'com.pinterest:id/password_toggle_cb'})
    await el4.click();
    let el5 = await driver.elementById("com.pinterest:id/next_bt");
    await save('next_bt', {value: 'com.pinterest:id/next_bt'})
    await el5.click();
    /*
    let el6 = await driver.elementByAccessibilityId("Pin from sixpackabs-reviews.com, Description: Black Panther");
    await save('first_image', el6)
    await el6.click();
    let el7 = await driver.elementById("com.pinterest:id/await save_pinit_bt");
    await save('await save_pinit_bt', el7)
    await el7.click();
    let el8 = await driver.elementByAccessibilityId("Cancel");
    await save('Cancel', el8)
    await el8.click();
    let el9 = await driver.elementByAccessibilityId("Back");
    await save('Back', el9)
    await el9.click();
    */
    let el10 = await driver.elementByAccessibilityId("Search");
    await save('search', {value: 'Search', key: 'ocrText'})
    await el10.click();
    let el12 = await driver.elementById("com.pinterest:id/view_search_bar_input");
    await save('view_search_bar_input', {value: 'com.pinterest:id/view_search_bar_input'})
    await el12.sendKeys("Marvel");
    let el11 = await driver.elementByXPath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.RelativeLayout/android.view.View/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.LinearLayout[2]/android.widget.LinearLayout[3]/android.widget.TextView");
    await save('People', {value: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.RelativeLayout/android.view.View/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.LinearLayout[2]/android.widget.LinearLayout[3]/android.widget.TextView', key: 'xpath'})
    await el11.click();
    let el13 = await driver.elementByXPath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.RelativeLayout/android.view.View/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/androidx.viewpager.widget.ViewPager/android.widget.LinearLayout/android.widget.LinearLayout/androidx.recyclerview.widget.RecyclerView/android.widget.LinearLayout[2]");
    await save('first_result', {value: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.RelativeLayout/android.view.View/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/androidx.viewpager.widget.ViewPager/android.widget.LinearLayout/android.widget.LinearLayout/androidx.recyclerview.widget.RecyclerView/android.widget.LinearLayout[2]', key: 'xpath'})
    await el13.click();
    let el14 = await driver.elementByXPath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.RelativeLayout/android.view.View/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.widget.LinearLayout/android.widget.HorizontalScrollView/android.widget.LinearLayout/android.widget.LinearLayout[2]/android.widget.TextView");
    await save('board', {value: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.RelativeLayout/android.view.View/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.widget.LinearLayout/android.widget.HorizontalScrollView/android.widget.LinearLayout/android.widget.LinearLayout[2]/android.widget.TextView', key: 'xpath'})
    await el14.click();    
}