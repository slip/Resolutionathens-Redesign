# Resolutionathens-Redesign

The new site for [Resolution Digital Type and Image](http://www.resolutionathens.com). Updates will occasionally show up at [beta.resolutionathens.com](http://beta.resolutionathens.com).

I'm going to use this space to design and develop in public. Eventually the notes I make here will become a case study.

### Getting Started

First, I steamboarded (finger-painting in the steam on the glass, help me make it a real verb!) in the shower. Then I sat down with some index cards (my old and dear friends) and jotted down all kinds of things: architecture,  wireframes, feature wants, etc. Then I opened up Sketch.

I decided to do things the "right" way this time and design for mobile first: design the mobile portrait at 320px wide in Sketch, then media queries with min-widths in my code, breaking where the design breaks, not for standard device sizes.

### Design Thoughts

<img src="https://raw.githubusercontent.com/slip/Resolutionathens-Redesign/Add-Navigation-%231/assets/img/resolutionLogo%402x.png" width="250px" style="float: left; margin-right: 20px;"> 

Taylor made this rad new Resolution logo. It's fun and colorful and evokes the whole print/digital thing. And we're fun. When you come to our site I want you to know that we're fun. I want to give you a small story about us, a little piece of our personality. And I want to incorporate the feel of the logo. So I came up with [this](https://invis.io/5R79J6B8G) as a first stab. I don't want to greet you with a wall of text, list of services, big sales pitch, or our extensive portfolio. I want you to get to know us.

### Setting up my development environment.

It's been some time since I have developed for the web, so I've been voraciously devouring every morsel of hot, hot HTML5, CSS3, SASS, frameworks, mixins, libraries, etc. to figure out which buffet I want to which I want to up-belly. (Not ending a sentence in a preposition sometimes requires making up new words).

For this particular project I decided on the following:

* Atom

  > I built Sorba in Brackets and I liked it pretty well. I went back to Atom. It's a bit of a toss up, they are both great.

* Git/Github

  > Obviously.

* Sketch and Photoshop

   > So happy using Sketch. I only pop into PS for things. And a quick shout out to [Invision](https://www.invisionapp.com/) for their awesome craft plugin and Invision sync, and also to [Zeplin](https://zeplin.io/)… these guys make my life easier.

* Jekyll

   > I built SorbaAtlanta, the Nucis space spec, and the current ResolutionAthens in WordPress, and PH9 in Joomla. That was fun, and I like CMS's. But I want this site to be crazy fast and stupid customizable. So I looked at static site generators. The ones I looked at seriously were [Jekyll](http://jekyllrb.com), [Middleman](http://middlemanapp.com/), [Hugo](https://gohugo.io/), and [Hammer](http://hammerformac.com/). I decided on [Jekyll](http://www.jekyllrb.com). So far I am happy with that decision, though I need to work out my gulp file.

* SASS

   > I can't tell you how much I love SASS. It's a life changing thing. I've been using [Bourbon](http://www.bourbon.io) as well. I have Neat installed, which I used extensively when laying out SorbaAtlanta, but I've been doing everything in flexbox with stupid responsive type for Resolution.

* Jade

   > I was using Emmet while developing Sorba, and it was pretty great, but once it was done, I still had HTML to edit. In the same way that SASS is prettier than CSS, Jade is just prettier than HTML.

* jQuery

   > I guess this is something I have to know. I used a couple of plugins on SorbaAtlanta. I am going to try to do most of what I need by hand here.
