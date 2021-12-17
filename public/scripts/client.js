/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  $("#userError").slideUp()
  $("#userError").hide()
  const createTweetElement = function (tweet) {
    const $tweetHeader = $('<header>').css('clear', 'both').addClass('tweet-header')
    const $tweetFooter = $('<footer>').css('clear', 'both').addClass('tweet-footer')
    const $nameOfWriter = $('<h3>').text(tweet.user.name)
    $nameOfWriter.addClass("nameOfWriter")
    const $usernameID = $('<h3>').text(tweet.user.handle)
    $usernameID.addClass('usernameID')
    const $tweetBody = $('<p>').text(tweet.content.text)
    $tweetBody.addClass('tweetBody')
    const $hr = $('<hr>')
    const $dateSincePost = $('<p>').text(timeago.format(tweet["created_at"]))
    $dateSincePost.addClass('dateSincePost')
    const $iconOne = $('<p>').text('Icon 3')
    $iconOne.addClass('iconPack')
    const $iconTwo = $('<p>').text('Icon 2')
    $iconTwo.addClass('iconPack')
    const $iconThree = $('<p>').text('Icon 1')
    $iconThree.addClass('iconPack')

    $tweetHeader.append($nameOfWriter, $usernameID)
    $tweetFooter.append($dateSincePost, $iconOne, $iconTwo, $iconThree)

    const $endTweet = $('<article>').addClass('tweetBox')
    $endTweet.append($tweetHeader, $tweetBody, $hr, $tweetFooter)
    return $endTweet
  }

  const renderTweets = function (tweets) {
    const $tweetBox = $('#tweetContainer')
    $tweetBox.empty()
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet)
      $tweetBox.prepend($tweet)
    }
  }

  const $form = $('#newTweetForm')

  const loadTweets = function () {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      datatype: 'JSON',
      success: (tweets) => {
        renderTweets(tweets)
      },
      error: (err) => {
        console.log('error:', err)
      }
    })
  }

  $form.on('submit', function (event) {
    event.preventDefault()
    const serializedTweet = decodeURI($(this).serialize())
    console.log(serializedTweet)
    if (serializedTweet.length === 5 || serializedTweet.length > 145 || serializedTweet === null) {
      $('#userError').slideDown()
      return
    } else {
      $("#userError").slideUp()
      $('#tweet-text').val("")
      $.post('/tweets', serializedTweet, (response) => {
        console.log(response)
        loadTweets()
      })
    }
  })
  // Test / driver code (temporary)
  // console.log($tweet); // to see what it looks like
  // console.log($('.tweetBox'))
  // $('#tweetContainer').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

});

