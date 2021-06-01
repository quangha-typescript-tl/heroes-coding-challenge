## Report
 - It took me 8 hours to complete this test
 - Some problems are expected to improve:
 - Add Armour and Weapon in hero-detail 
 - Enhance interface in screens
 - Add weapon images to make it visual while changing weapon in the war

# The contest

We are looking to contract the best freelancers in the world for our interactive story building site.   We have designed a coding challenge to help us find the best coders on Freelancer.  

Open to all countries.  Open to remote work.  Flexible hours.

## Framework
 - Latest angular
 - Typescript
 - RxJS
 - Konva https://konvajs.org/ 

## Submission
 - Github source repo:  Pull Request to https://github.com/authenticwalk/heroes-coding-challenge
 - Include in report how long the exercise took
 - What you would improve on if given more time
 -Test coverage percentage

## What we are building
 - We are building a simple fight simulator between heroes.
 - We are not actually publishing this code but using it as a coding challenge to find new developers
 - Our actual project is that we are creating a platform to create interactive stories rich with images, audio, variable states, choices and text dialogue.  We use ngrx and Konva heavily to show the current state of the story and are looking to expand the freelancers and contractors.  

## Base Project
 - Begin with the code from Angular Tour of Heroes part 5  https://github.com/authenticwalk/heroes-coding-challenge
- Your submission will be a pull request against that master branch.

## Minimum Tasks
- [ ] Add a health property to each hero.  Default it to 100
- [ ]  Add a tab for weapons. It has the properties: id, name, damage
- [ ]  Add a tab for armour. It has the properties: id, name, health
- [ ]  Add a weapon property to each hero
- [ ]  Add an armour property to each hero ( a hero’s health is hero.health + armour.health)
- [ ]  Add ImageSrc to each hero.  Allows you to add an image
- [ ]  Add a canvas (Konva framework) to the dashboard page
- [ ]  When click on hero on the dashboard page it adds them to the canvas, showing their hero.imageSrc on the canvas
- [ ]  When click on them again they are removed from the canvas
- [ ]  Every second everyone on the stage attacks, dealing the damage of the weapon in their hand to all other heroes
- [ ] You can click on hero and change the weapon and it updates the current battle
- [ ]  When the hero gets down to <50 health show a red background around the hero
- [ ]  When a hero gets to 0 they are removed from the canvas

## Improvements
- Feel free to improve on the above criteria to make the experience better for the user.

## Evaluation Criteria
 - [40 points] - all minimum tasks are completed
 - [10 points] - developer improved on the minimum tasks to make it a better experience for the user
 - [10 points] - developer improved on the visual layout
 - [5 points] - code is well abstracted
 - [5 points] - code is well documented and self-documented (ex. Self evident function names)
 - [5 points] - 90% code coverage
 - [5 points] - After running https://stryker-mutator.io/ still have 80% code coverage.
 - [5 points] - Suggestions on how would improve if had more time
 - [5 points] - Followed instructions
 - [5 points] - Responsive layout
 - [5 points] - semantic commit messages and single purpose commits

# Installing

` npm run install `

# Semantic Commit Messages

@see https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716

- feat: (new feature for the user, not a new feature for build script)
- fix: (bug fix for the user, not a fix to a build script)
- docs: (changes to the documentation)
- style: (formatting, missing semi colons, etc; no production code change)
- refactor: (refactoring production code, eg. renaming a variable)
- test: (adding missing tests, refactoring tests; no production code change)
- chore: (updating grunt tasks etc; no production code change)
