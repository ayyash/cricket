# Cricket

Angular Cricket

## Get started

Download nodejs (10+) and npm (6.5+), git clone the project, and in the root, run 

`npm install -g @angular/cli typescript gulp`

> Keep an eye on https://github.com/gulp-community/gulp-less/issues/312, if not yet resolved, update node_modules/gulp-less/index file with the content of the pull request https://github.com/gulp-community/gulp-less/pull/313

You need gulp to run the gulp tasks to prepare css out of LESS and RTL files, in addition to post build for ssr. Always check what typescript is supported by angular and install a local version of it.

Run

`npm run install` and `npm run install:dev`: will get you started with packages needed for this seed

Then

`gulp inject` to inject all components and services in barrel files

Finally

`gulp critical` to generate the css files from .less files

## NPM commands

The following commands in npm to help you get going:

- `npm start`: starts with normal english angular development (then browse to localhost:5100)
    serves index.dev.html with localdata/config.json
- `npm run start:prod`: starts development server with production configuration and environment
    serves index.dev.prod.html with localdata/config.prod.json

<!-- - `npm run network`: starts with 192.168.0.100:5200 as host to test localhost on mobile devices (change host in package.json)
- `npm run network:secure`: starts with normal english angular development, under https (then browse to https://192.168.0.100:5200) This option might need a local certificate to be created. This option needs https for iis to run mockup api. This option never works on Safari. -->

- `npm run build` generates a client-side angular app in /host/client + /host/index/index.lang.html to be served
> this rewrites the baseHref to / or /lang/ depending on gulp configuration: isUrlBased, 
> if true, the project will appear under hosturl/en or hosturl/ar ... etc

- `npm run build:ssr`:  builds the client-side and server-side full version under /host/client, also copies resources to host/server/locale and make them ready to be used in SSR. 

Notes:

- Do not rename `placeholder.html` to `index.html`, there is a limitation in ngExpressEngine that it favores the index.html in output folder, over the one provided to `render()` function.
- There are four route files in `host/server` folder, each with a different routing configuration to suit the project needs: 
    - routes (client side only)
    - routes-url (client side only, language switch via url)
    - routes-ssr (server side)
    - routes-ssr-url (server side, language switch via url)
- Known limitation with resources. I still depend on global `resources.keys` directly, to read resources on both client and server, depending on language cookie. This needs to be fixed so that the resources are fully loaded on server before use.

## Angular universal

This seed assumes a second project living in: `host`, where enough nodejs server code is created to run the server later. The npm task `build:ssr` creates : `/client`, and the creates server side files `server/main.js`, in addition to locales and index files. So the final tree of the host folder looks like this

```
|-client (angular output sits here)
|-server
|--------locale
|----other server files
|----main.js
|-index
|----index.en.html
|-server.js
```

## Gulp commands for Angular

You can optionally use these instead of the angular cli packaged commands (or you can create files manually), here is a quick explanation of each command under ng.js, with the most useful at the top

(general rule: name, and major name should start with uppercase letter: like Example, the file names and selectors generated are all lowercase)


### Generate

- `gulp component --name Example --major Container --ispartial false --isform false`  
    **Useful and common** This task creates a component inside a folder indicated in 'major' (could be a folder path like Container/SubContainer), with the name `example.component.ts`, if **ispartial** is set to true, the file name is `example.partial.ts` (and it specifies a selector `cr-example` ready to be used). If **isform** is set to true, the code is ready with minimum form elements (I should work on renaming the file to: `form.partial.html`). The task also adds the component to the correct module under */routes* (`major.routes.ts`) and creates a dummy route for it if it was not partial. Your job is to implement the component, and head to `src/app/routes.module.ts` to add the lazy loaded path to the new module (make sure to use the `MainLayout` as the default component there)

- `gulp model --name Example`  
    Creates an `example.model.ts` in */models* folder with a single property 'id', your job is to implement it. it also performs an inject into */core/services*

- `gulp service --name Example`  
    Creates an `example.service.ts` in */services* folder with the basic get, post, delete, and put functions, also injects the service in */core/services* and creates a singleton in */core/core.module*. Your job is to implement the service correctly and create an api mapping point in *config.ts*

- `gulp fullService --name Example`  
    **Useful but rare** In addition to the creating the model, and service and injecting them in their correct locations, it also creates an api config point in *config.ts*. Your job is to implement the service as requested. The service is ready to be injected in any component.

- `gulp pipe --name Example`  
    Create an `example.pipe.ts` and places it in */lib/pipes*, then exports it in *lib.module.ts* (this is already imported inside */core/shared.module* which is imported into *app.module*, you can immidiately start using it, if however you want to use it in a specific group of conrols, your job is to remove it from */lib/lib.module.ts* and declare it elsehwere)

- `gulp directive --name Example`   
    Create an `example.directive.ts` and places it in */lib/directives*, then exports it in *lib.module.ts* (this is already imported inside */core/shared.module* which is imported into *app.module*, you can immidiately start using it, if however you want to use it in a specific group of conrols, your job is to remove it from */lib/lib.module.ts* and declare it elsehwere)


### Inject

Following are quick calls to inject all classes in specific folders into their barrels in the core folder, to make them easier to use throughout the project. Classes should not be imported individually but through their barrel, to keep maintenance of their folder path under control

- `gulp injectComponents`: inject all components in **/components** into **/core/componetns** barrel
- `gulp injectServices`: inject all services in **/services**  into **/core/services** barrel
- `gulp injectLib`: inject all directives, and pipes from **/lib** into **/lib/lib.module** which is in turn imported into core/shared.module
- `gulp injectModels`: inject all models in **/models** into **/core/services** barrel
- `gulp inject`: **Useful** Injects all above, do this when in doubt that you missed something, or you deleted a file

### Less used

- `gulp module --major Example`  
    This simply creates a file in *routes* folder, names it `example.route.ts`. Your responsibility is create the components, and add a major route in *routes.module.ts* (keep all comments in place)
    

## Assets

// TODO: rtl styles not incorporated in build yet

To generate assets after changing less files (this is a very critical task, you should not modify styles unless 100% sure of what you're doing)

- `gulp rawless`: prepares *src/assets/css/cr.css* and *cr.rtl.css*
- `gulp`: the default task does the same as rawless while watching sh.\*.less, ui.\*.less and rtl.\*.less in *mockups* less folder (see gulp config)
- `gulp prepicons`: this takes files from the icomoon generated files and copies them in */dummy* folder in preparetion to generate icons
- `gulp iconset`: generates icons produced by icomoon tool in `dummy/iconset.html` and in `mockup/less/ui.icons.less`, run `gulp rawless` afterwords to generate the css files. Browse to `localhost/~projectname/mockup/dummy/iconset.html` to see a list of icons generated. 
- `gulp createicons`: does both `prepicons` and `iconset`
- `gulp critical`: generates four files: `cr.general.css` and `cr.critical.css`, `cr.general.rtl.css` and `cr.critical.rtl.css` into `assets` folder (in addition to the cr.css and cr.rtl.css). The general files are injected through `angular.json` into html, the critical files are added to html header (they are referenced in `placeholder.html`). This is to downsize the initial style file, and have better performance. The rules of which what gets placed in critical is very basic, any group of styles in any `mockup/less/*.less` file wrapped inside `/* CRITICAL BEGIN */` and `/* CRITICAL END */`. 



> PS: Using less in components, is possible, remember to start with `@import "sh.vars.less"`; and avoid styles that need to be mirrored for RTL.

