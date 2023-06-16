Intro:
This is the result of months of job board fomo. I always wonder, am I looking in the right places? But in the end, I always come to the conclusion that I'm only one person,
I can only look so many places. Then it hit me. I'm one person... with three different certifications in web development. Which means I'm not just one person. I'm
one person and a keyboard. And I decided to use the keyboard. I figured if I didn't have to sift through the 100+ different senior level positions, it would take me seconds
to look through all of the positions I actually qualify for in a given job board. So I started writing a program that could filter more than what job boards currently offer.

Description:
This is a more advanced filter than the advanced filter already offered by Adzuna. Why make this for Adzuna specifically? Adzuna offers the most information about jobs through
their api than any of the competing api's available to the public, meaning this code doesn't use any scraping techniques that could cause unnecessary stress on the Adzuna server.

Features:
Currently, the uber filter can exclude postings with specific words in their title. It can also filter out locations. It currently has limited support for excluding certian
words in the description. Adzuna provides this somewhat out of the gate, but can mess up sometimes. The api provides only a small part of the description, so the uber filter
doesn't entirely fix this.

Usage:
This application is run using node.js. You have to sign up for the Adzuna API that this code depends on at https://developer.adzuna.com/. Once you do, you can put your app id,
key and the category of job you're looking for (see FAQ) into the variables at the top. From there you can create new Search objects and blacklists to pass into the async
function at the bottom. The async function also has a place that lets you rename locations in case the api gives you some name that Google Maps doesn't recognize.

FAQ:

Q: What categories can I put into the program?
A: https://developer.adzuna.com/docs/categories

Q: I'm getting an error with a parameter I'm using.
A: https://developer.adzuna.com/activedocs#!/adzuna/search

Q: Can I modify/reuse this code?
A: I'd appreciate it if you link the repo if you post it somewhere, but in short yes.

Q: Will you make a graphical interface for those of us not as technically gifted?
A: I made this mainly for my own benifit, and I myself am technically gifted enough to use the program as is. I have other projects that are taking priority so I'm leaving it
   here for now. I may do add more in the future though.

Q: Are there any parameters you can put into the api that you haven't implemented?
A: Yes. I'm very open to various oppertunities, so I didn't feel the need to use some of them. Feel free to add them into the code if you want.

Q: Some jobs just put years of experience in their description as a guideline. Shouldn't you apply just to those just to be safe?
A: Yes. I'd suggest having one job board that's not Adzuna that you can look through and apply to those kinds of jobs when you run out of jobs from the filter. That way
   you can effectively look through two job boards at once. You could also make the filters less strict to look through Adzuna more thoroughly (or just use the website itself).

Q: Will you make a filter for any other job board?
A: If they expand support for their api's, maybe. I don't use scraping techniques on principle, so I'm limited to whatever tools the given website provides me through their api.

Q: Can I just use your api key? I don't want to sign up for anything.
A: I only get so many api calls per month, so no.

Q: I notice you have some parameters already in the program. Are these the ones you would recommend?
A: I'm not really an expert. These are just some examples. In general, the more words you try to filter out, the less effort you have to put in, and the more potential
   oppertunities you miss. The examples are a bit on the strict side. Ask a job coach if you want professional suggestions.
