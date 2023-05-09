const{ Builder, By, Key, until} = require('selenium-webdriver');
const should = require('chai').should();

/* 
 As a customer,
 I want to be able to search for a product,
 so that I can find the product I want to buy 
*/

// Test grouping : search
describe('Search for a product', () =>{
    // Test case:
    context('I search for a product', () =>{
        it('I should see the product that I have searched for', async () => {
            // Start web browser
            const driver = await new Builder().forBrowser('firefox').build();
            
            // Search for a product
            try{
                //MOve to magento website
                await driver.get('https://magento.softwaretestingboard.com/');

                // Get the search input
                await driver.wait(until.elementLocated(By.css('#search')), 10000);
                await driver.findElement(By.id('search')).sendKeys('shirt',Key.RETURN);

                // Find the first product
                await driver.wait(until.elementLocated(By.css('.product-item:first-child')), 10000);
                const product = await driver.findElement(By.css('.product-item:first-child'));

                // Find information in the product we selected
                let productTitle = await product.findElement(By.css('.product-item-link'));
                let productPrice = await product.findElement(By.css('.price'));

                // Extract text
                let productTitleText = await productTitle.getText();
                let productPriceText = await productPrice.getText();

                //console.log (productTitleText,productPriceText);

                productTitleText.should.equal('Radiant Tee');
                productPriceText.should.equal('$22.00');

            } catch (error) {
                console.log(error);
            } finally{
                // await driver.quit();
            }

        } );

    });
});