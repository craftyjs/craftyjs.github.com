http://craftyjs.com/

CS499-PacMan
============

### Install git

You will need to have git installed.  Instructions for installing git for different operating systems can be found here:

[Installing git](http://git-scm.com/book/en/Getting-Started-Installing-Git)

Downloads can be found here:

http://git-scm.com/downloads

### Getting the project

You will first want to clone the project:

```
git clone https://github.com/bradengroom/CS499-PacMan.git
```

You will now have your own local copy of the project to use:

```
cd CS499-PacMan/
```

### Committing Your Tests

You will want to add you test files to the `src/tests` directory.

Once you have created your tests, you can see what files you have changed by running this:

```
git status
```

You will need to add these changed files to your next commit.  You can do this by running:
```
git add .
```

Now you will need to commit these changes to your local version of the project:
```
git commit -a -m "YOUR MESSAGE"
```

Make sure to type a descriptive commit message in quotes.

Now all you need to do is push your local changes to the shared version of the project:

```
git push
```

You will be asked for your github credentials.

### Updating your local copy

You can update your local copy by typing this:
```
git pull
```
