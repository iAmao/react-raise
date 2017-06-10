# How to contribute

It is paramount to the development of `react-raise` that the community is empowered
to make changes and get them into the library. Here are some guidelines to make
that process a cake walk.

## Reporting issues

To report a bug, request a feature, or even ask a question, make use of the GitHub Issues
section for [react-raise][issues]. When submitting an issue please take the following steps:

1. **Seach for existing issues.** Your question or bug may have already been answered or fixed,
be sure to search the issues first before putting in a duplicate issue.

2. **Create an isolated and reproducible test case.** If you are reporting a bug, make sure you
also have a minimal, runnable, code example that reproduces the problem you have.

3. **Include a live example.** After narrowing your code down to only the problem areas, make use
of [jsFiddle][fiddle], [jsBin][jsbin], or a link to your live site so that we can view a live example of the problem.

4. **Share as much information as possible.** Include browser version affected, your OS, version of
the library, steps to reproduce, etc. "X isn't working!!!1!" will probably just be closed.

## Contributing Changes

### Setting Up

To setup for making changes you will need to take a few steps, we've outlined them below:

1. Ensure you have node.js installed. You can download node.js from [nodejs.org][node]. Because react-raise uses es6, you will need a modern version of node. v6+ is recommended.

2. Fork the [react-raise][react-raise] repository, if you are unsure how to do this GitHub has a guides for the [command line][fork-cli] and for the [GitHub Client][fork-gui].

3. Next, run `npm install` from within the clone of your fork. That will install all dependencies necessary to build react-raise


### Making a Change

Once you have node.js, the repository, and have installed dependencies are you almost ready to make your
change. The only other thing before you start is to checkout the correct branch. Which branch you should
make your change to (and send a PR to) depends on the type of change you are making.

Here is our branch breakdown:

- `master` - Make your change to the `master` branch if it is an *urgent* hotfix.
- `develop` - Make your change to `develop` if it is a *non-urgent* bugfix or a backwards-compatible feature.
- `wild` - Make your change to `wild` if it is a breaking change, or `wild`/crazy idea.

Your change should be made directly to the branch in your fork, or to a branch in your fork made off of
one of the above branches.

### Testing Your Change

You can run these tests by running `npm test` from the command line. If you fix a bug please add a test that will catch that
bug if it ever happens again. This prevents regressions from sneaking in.

### Submitting Your Change

After you have made and tested your change, commit and push it to your fork. Then, open a Pull Request
from your fork to the main `react-raise` repository on the branch you used in the `Making a Change` section of this document.

## Quickie Code Style Guide

`react-raise` adheres stricty to the [airbnb][airbnb] js style guide. Read below for a quickie style guide:

- Use 2 spaces for tabs, never tab characters.
- Valid jsdocs ob functions or classes
- No trailing whitespace, blank lines should have no whitespace.
- Always favor strict equals `===`.
- Follow conventions already in the code, and listen to eslint.
- **Ensure changes are eslint validated.** After making a change be sure to run the build process to ensure that you didn't break anything. You can do this with `npm test` which will run eslint, then run the test suite.

[issues]: https://github.com/andela-iamao/react-raise/issues
[react-raise]: https://github.com/andela-iamao/react-raise
[fiddle]: http://jsfiddle.net
[jsbin]: http://jsbin.com/
[node]: http://nodejs.org
[fork-cli]: https://help.github.com/articles/fork-a-repo/
[fork-gui]: https://guides.github.com/activities/forking/
[airbnb]: http://airbnb.io/javascript/

## Contributor Code of Conduct

[Code of Conduct](CONTRIBUTOR_CONVENANT.md) is adapted from [Contributor Covenant, version 1.4](http://contributor-covenant.org/version/1/4)
