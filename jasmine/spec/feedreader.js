/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

  describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         * Throws a failure in the browser.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
  describe('Checking the URL in each feed', function(){
        it('URL in each feeds is defined and not empty.', function(){
             allFeeds.forEach(function(feed){
                 expect(feed['url']).toBeDefined();
                 expect(feed['url'].length).not.toBe(0);
               });
             });
         }
       )

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
  describe('Checking the Name in each feed:', function(){
        it('Name in each feed is defined and not empty.', function(){
             allFeeds.forEach(function(feed){
                 expect(feed['name']).toBeDefined();
                 expect(feed['name'].length).not.toBe(0);
               });
             });
         }
       )
    });


    /* TODO: Write a new test suite named "The menu" */
   describe('The menu', function(){
      /* This test ensures the menu element is
       * hidden by default by ensuring the body initializes with
       * menu-hidden class
       */

        it('is hidden to start', function(){
            expect(document.body).toHaveClass('menu-hidden');
        });

       /* This test fakes a click on the hamburger icon, checks for
       * a visible menu, and then sends another click to make sure the
       * menu-hidden class has returned.
        */
        it('comes when you click the hamburger and goes away when you click it again', function(){
          const hamburger = document.getElementsByClassName('icon-list')[0];
          var itWorks = false;
          hamburger.click();
          if (document.body.className != 'menu-hidden'){
              hamburger.click();
              if (document.body.className === 'menu-hidden'){
                itWorks = true;
          }
          expect(itWorks).toBe(true);
        }
    });
});

    /* TODO: This is new test suite named "Initial Entries" */
    describe('Initial Entries', function(){
      /* TODO: this test ensures when the loadFeed
       * function is called and completes its work, there is at least
       * a single .entry element within the .feed container.
       * Remember, loadFeed() is asynchronous so this test will require
       * the use of Jasmine's beforeEach and asynchronous done() function
       */
       var newEntries;
       var newFeed;
       /*beforeEach will run loadfeed and make sure it's finished
       * before running the are loading test.
       */
        beforeEach(function(done){
         loadFeed(1);
           done();
         });

         function myLittleBug(feed, entry){
           //quick function to separate and explain the trouble i'm having with
           //this piece.
           //first i'll grab the whole entry collection
           newEntries = document.getElementsByClassName('entry');
/*
* This section is giving me fits.
* I do not understand why newEntries is outputting an
* HTML Collection but returning length 0 and Undefined
* on any attempt to access the content.
* what am i missing?
*/
           console.log(newFeed);
           console.log(newFeed.length);
           console.log(newEntries);
           console.log(newEntries.length);
           console.log(newEntries['1']);
/* I only have those console.log calls to see what's coming back. I shouldn't
*need them at all. Up above i pull the first feed item and the first entry item
*and then below i look for entry in feed. I don't need newEntries and only have
*it here for my own bug testing to figure out what's happening.
*/
    };

         it('are loading', function(){
           newFeed = document.getElementsByClassName('feed')[0];
           firstEntry = document.getElementsByClassName('entry')[0];
           myLittleBug(); // calling for test.
           var allSet = false;
           if(newFeed.contains(firstEntry)){allSet=true;}

           expect(allSet).toBe(true);
        });
    });


    /* TODO: New test suite named "New Feed Selection" */
    describe('New Feed Selection', function(){
      /* TODO: This test ensures when a new feed is loaded
       * by the loadFeed function that the content actually changes.
       * Remember, loadFeed() is asynchronous.
       */
       var theyMatch = true;
       //set up by calling loadfeed and cloaning the return,
       // then calling it again and comparing new and old.
       beforeEach(function(done) {
         const oldFeed = document.getElementsByClassName('feed')[0].cloneNode();
         loadFeed(2);
         const newFeed = document.getElementsByClassName('feed')[0];
         if (newFeed != oldFeed) {theyMatch = false}
           done();
         });
       // and the actual test is here:
         it('is loading', function(){
          expect(theyMatch).toBe(false);
        });
    });
}());
