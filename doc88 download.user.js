// ==UserScript==
// @name         doc88 download
// @version      0.1
// @description  open full document, hide garbage, load all pages, print screen to pdf
// @author       You
// @match        http://www.doc88.com/*
// @grant        none
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==

var active = false;
var first = true;

function load(){
    $('.iconfont.more').click();
    $('.header').toggle();
    $('.readshop').toggle();
    $('.surplus').toggle();
    $('.commonbox1').toggle();
    $('.commentDiv').toggle();
    $('.boxright').toggle();
    $('.boxleft').css("width", "inherit");

    var count = $('.page_pb').length;
    var done = 0;


    function f() {
        if (active){
            done = 0;
            $('.page_pb').each(function() {
                //scroll to first non loaded page
                if (!$(this).text().includes('%')){
                    done++;
                }
                else{
                    $(window).scrollTop($(this).offset().top);
                    return false;
                }
                //TODO detect when it stops loading for a long time, maybe memory is full, maybe we need to print in chunks
            });;
            $('#doc88d').text('Loading: ' + done + "/" + count);
        }
        else{
            $('#doc88d').text('Paused: ' + done + "/" + count);
        }
        return count === done;
    }
    var quit = setInterval(function(){
        if (f()){
            clearInterval(quit);
        }
    }, 500);
}
(function() {
    'use strict';

    $('.content').before($('<button/>')
                         .attr('id', 'doc88d')
                         .css('position', 'fixed')
                         .css('right', '30px')
                         .css('z-index', '10000')
                         .text('Load')
                         .click(function () {
        if (first){
            load();
            first = false;
        }
        active = !active;
    }));
})();