# ng-shared-example

This is an attempt to bring together everything I have learned about creating shared libraries using Angular between the web and mobile devices using NativeScript. I hope to not only provide a resource for myself to consult, but also use as a test-bed for anything new that I might need to share as requirements change. But I also hope this is a resource that will help others to solve the same problems I have run into.

## Scaffolding

The scaffolding of this example was created using the following commands.

### Make Web Component Library
I recommend you actually go through these steps rather than copy this template as a starting point so as to make sure you have all the latest changes necessary to angular, nativescript, ng-packagr, etc.
If you simply copy this repo you may find it out of date and it might cause you great pain. Then of course, this may not work with future releases, but we'll have to tackle that as we find the issues.

```
mkdir ng-shared-example
ng new
    > test-lib
cd test-lib
ng g lib
    > mytestlib
```

The Angular CLI created a folder ```projects/mytestlib```. Within the src folder there was a lib folder with a sample component. I simply renamed lib to the name of my component, in this case, ```testcomp``` (renaming the files within to match). In my real world examples I have many components and services in a single library. I don't understand what the lib subdirectory is supposed to be for. I don't need to add one-level to my tree unnecessarily.

The idea behind the test-lib folder is to provide a place to hold code for a library that we can package up into a reusable Angular module. The "app" here is really just a "sandbox" or test app that we can use to test our components and services within the library to make sure they work before we bother publishing them and testing them in some other app.

I like my libraries scoped so I edit the ```package.json``` file in ```projects/mytestlib``` and change the name as follows ...

```
    "name": "@myscope/mytestlib",
```

### Test Web Component Library

Now after some minor editing to make a simple example I made sure that this ran as a web component.

```
ng serve
```

### Publish Web Component Library

Once that was working I could publish my library. I use [Verdaccio](https://verdaccio.org) for publishing my libraries privately. It's a little bit of work to set-up, but once you do you can completely forget about it and it just works flawlessly. Just make sure it's in your computer startup scripts so it's always running.

```
ng build mytestlib
npm publish dist/mytestlib
```

**TODO**: Does anyone know how to make this web component available to another project locally without having to "publish" the component. ```npm link``` and **symlinks** never work from everything I have tried. I would love to not have to publish the next version of my library just to further test my library in an application external to the lib. Because the next time I publish Verdaccio requires me to bump the version of the library, it refuses to overwrite even though I know I'm the only one affected by the version bump. A little frustrating I have to admit. So I have to do ...

```
cd project/mytestlib
bump patch
```

...where bump is this utility ```"bump-version": "ianstormtaylor/bump",``` which I installed globally.

### Make other application (or library) to use this library

Build our new app and add our above library to it now that it is published (again only locally as we are using Verdaccio).

```
ng new
    > test-app
npm i @myscope/mytestlib
```

Then we add in our component from our library and test ...

```
ng serve
```



