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

        it(' each have a URL which is defined and not empty.', function(){
             allFeeds.forEach(function(feed){
                 expect(feed.url).toBeDefined();
                 expect(feed.url.length).not.toBe(0);
               });
             });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it(' each have a Name which is defined and not empty.', function(){
             allFeeds.forEach(function(feed){
                 expect(feed.name).toBeDefined();
                 expect(feed.name.length).not.toBe(0);
               });
             });
         });

    /* new test suite named "The menu" */
    describe('The menu', function(){
        /* This test ensures the menu element is
         * hidden by default by ensuring the body initializes with
         * menu-hidden class
         */

          it('is hidden to start', function(){
              expect(document.body.classList.contains('menu-hidden')).toBe(true);
          });//closes hidden to start

         /* This test makes sure the menu is hidden and then fakes a click on
          * the hamburger icon and checks for a visible menu.
          */
          it('comes and goes when you click the hamburger', function(){
            const hamburger = document.getElementsByClassName('icon-list')[0];
            //make sure we're starting out hiddden:
            if (!document.body.classList.contains('menu-hidden')){
              document.body.classList.add('menu-hidden'); }
            hamburger.click();
            expect(document.body.classList.contains('menu-hidden')).toBe(false);
            hamburger.click();
            expect(document.body.classList.contains('menu-hidden')).toBe(true);
          }); //closes comes and goes
  });

    /* new test suite named "Initial Entries" */
  describe('Initial Entries ', function(){
    /* TODO: this test ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     * Remember, loadFeed() is asynchronous so this test will require
     * the use of Jasmine's beforeEach and asynchronous done() function
     */
       /*beforeEach will run loadfeed and make sure it's finished
       * before running the are loading test.
       */
        beforeEach(function(done){
         loadFeed(1, done);
         });

         it('are loading', function(){
           expect(((document.querySelector('.feed').querySelectorAll('.entry')).length) > 0).toBe(true);
        });
    });

    /* New test suite named "New Feed Selection" */
  describe('New Feed Selection', function(){
    /* TODO: This test ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     * Remember, loadFeed() is asynchronous.
     */
     var oldFeed, newFeed;
     //set up by calling loadfeed and cloaning the return,
     // then calling it again and comparing new and old.

    beforeEach(function(done) {
      loadFeed(0, function() {
        oldFeed=document.getElementsByClassName('feed')[0].cloneNode(true);

        loadFeed(1, function(){
          newFeed=document.getElementsByClassName('feed')[0].cloneNode(true);

          done();
        }); // closing loadFeed1
      }); // closing loadFeed0
    }); // closing before each

   // and the actual test is here:
    it('is loading', function(){
        expect(newFeed.innerHTML==oldFeed.innerHTML).toBe(false);
    });//closing it is loading
  }); // closing new feed selection suite
}());
