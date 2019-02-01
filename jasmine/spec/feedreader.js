/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    //Rss Feeds test suite
    describe('RSS Feeds', function () {
        /* this test makes sure that the allFeeds variable
         * has been defined and that it is not empty.
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /*this test loops through each feed in the allFeeds object and ensures
         *t has a URL defined and that the URL is not empty.
         */
        it("checking all urls", function () {
            for (var feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe(""); //expect that each url is not empty
                expect(feed.url).not.toBeNull(); //expect that each url is not null
            }
        });

        /* this test loops through each feed in the allFeeds object and ensures
         * it has a URL defined and that the URL is not empty.
         */
        it("checking all names", function () {
            for (var feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe(""); //expect that each name is not empty
                expect(feed.name).not.toBeNull(); //expect that each name is not null
            }
        });
    });

    //The menu test suite
    describe("The menu", function () {
        //this test makes sure that the menu element is hidden by default.
        var body = document.body;
        it("the menu element is hidden by default", function () {
            //expect that the menu-hidden class is added to the body
            expect(body.classList.contains("menu-hidden")).toEqual(true);
        });
        
        /* this test makes sure that the menu changes visibility when the
         * menu icon is clicked.
         */
        it("checking visibility of the menu", function () {
            var menuIcon = document.getElementById("menu-icon");
            menuIcon.click(); //show the menu
            //expect that the menu-hidden class is removed form the body
            expect(body.classList.contains("menu-hidden")).toEqual(false);
            
            menuIcon.click(); //hide the menu
            //expect that the menu-hidden class is added to the body
            expect(body.classList.contains("menu-hidden")).toEqual(true);
        });
    });
        
    //Initial Entries test suite
    describe("Initial Entries", function () {
        /* this test makes sure that when the loadFeed function is called
         * and completes its work, there is at least a single .entry element
         * within the .feed container.
         */
        beforeEach(function(done) {
            loadFeed(0, done); //load a feed before expectation
        });

        it("at least a single .entry element within the .feed container", function (done) {
            var articles = document.querySelectorAll(".feed .entry-link .entry");
            //expect that there is at least an article that has .entry class
            expect(articles.length).toBeGreaterThan(0);
            done();
        });
    });    
    
    //New Feed Selection test suite    
    describe("New Feed Selection", function () {
   /* this test makes sure that when a new feed is loaded by
    * the loadFeed function the content actually changes.
    */
        var startFeed,
            newFeed,
            feed;
        beforeEach(function(done) {
            loadFeed(0, done); //load a feed
            feed = document.getElementById("feed").innerHTML;
            startFeed = feed;
            loadFeed(1, function () { //load another feed
                feed = document.getElementById("feed").innerHTML; //expect that feed is changed
                newFeed = feed;
                done();
            });
        });

        it("the content of feeds actually changes.", function (done) {
            //expect that the content of feed is changed
            expect(startFeed).not.toEqual(newFeed);
            done();
        });
    });

}());