# Cricket

Angular Cricket

## Get started

Download nodejs (10+) and npm (6.5+), git clone the project, and in the root, run 

`npm install -g @angular/cli typescript gulp`

You need gulp to run the gulp tasks to prepare css out of LESS and RTL files (TODO: this is a future task). Always check what typescript is supported by angular and install a local version of it.

## NPM commands

The following commands in npm to help you get going:

- `npm start`: starts with normal english angular development (then browse to localhost:5100)
> Also possible: 192.168.0.100:5100 (to test localhost on mobile devices)
- `npm run start:ar`: starts development in Arabic version.
- `npm run build:ssr`:  builds the serverside full mockup version under /Cricket.mockups


// TODO: create a build for production version
- `npm run network`: TODO: document
- `npm run network:secure`: starts with normal english angular development, under https (then browse to https://192.168.0.100:5200) This option might need a local certificate to be created. This option needs https for iis to run mockup api. This option never works on Safari.

## Gulp commands for Angular

You can optionally use these instead of the angular cli packaged commands (or you can create files manually), here is a quick explanation of each command under ng.js, with the most useful at the top

(general rule: name, and major name should start with uppercase letter: like Example, the file names and selectors created are all lowercase)


### Generate

- `gulp component --name Example --major Container --ispartial false --isform false`  
    **Useful and common** This task creates a component inside a folder indicated in 'major' (could be a folder path like Container/SubContainer), with the name example.component.ts, if ispartial is set to true, the file name is example.partial.ts (and it specifies a selected "cr-example" ready to be used). If isform is set to true, the code is ready with minimum form elements (always name a form component like this: form.partial.html). The task also adds the component to the correct module under /routes (major.routes.ts) and creates a dummy route for it if it was not "partial". Your job is to implement the component, and head to src/app/routes.module.ts to add the lazy loaded path to the new module (make sure to use the MainLayout as the default component there)

- `gulp model --name Example`  
    Creates an example.model.ts in /models folder with a single property 'id', your job is to implement it. it also performs an inject into /core/services

- `gulp service --name Example`  
    Creates an example.service.ts in /services folder with the basic get, post, delete, and put functions, also injects the service in /core/services and creates a singleton in /core/core.module. Your job is to implement the service correctly and create an api mapping point in config.ts

- `gulp fullService --name Example`  
    **Useful but rare** In addition to the creating the model, and service and injecting them in their correct locations, it also creates an api config point in config.ts. Your job is to implement the service as requested. The service is ready to be injected in any component.

- `gulp pipe --name Example`  
    Create an example.pipe.ts and places it in /lib/pipes, then exports it in lib.module.ts (this is already imported inside /core/shared.module which is imported into app.module, you can immidiately start using it, if however you want to use it in a specific group of conrols, your job is to remove it from /lib/lib.module.ts and declare it elsehwere)

- `gulp directive --name Example`   
    Create an example.directive.ts and places it in /lib/directives, then exports it in lib.module.ts (this is already imported inside /core/shared.module which is imported into app.module, you can immidiately start using it, if however you want to use it in a specific group of conrols, your job is to remove it from /lib/lib.module.ts and declare it elsehwere)


### Inject

Following are quick calls to inject all classes in specific folders into their barrels in the core folder, to make them easier to use throughout the project. Classes should not be imported individually but through their barrel, to keep maintenance of their folder path under control

- `gulp injectComponents`: inject all components in /components into /core/componetns barrel
- `gulp injectServices`: inject all services in /services  into /core/services barrel
- `gulp injectLib`: inject all directives, and pipes from /lib into /lib/lib.module which is in turn imported into core/shared.module
- `gulp injectModels`: inject all models in /models into /core/services barrel
- `gulp inject`: **Useful** Injects all above, do this when in doubt that you missed something, or you deleted a file

### Less used

- `gulp module --major Example`  
    This simply creates a file in routes folder, names it example.route.ts. Your responsibility is create the components, and add a major route in routes.module.ts (src) (keep all comments in place)
    

## Assets

To generate assets after changing less files (this is a very critical task, you should not modify styles unless 100% sure of what you're doing)

- `gulp rawless`: prepares src/assets/css/cricket.css and cricket.rtl.css
- `gulp`: the default task does the same as rawless while watching sh.\*.less, ui.\*.less and rtl.\*.less in mockups less folder
- `gulp iconset`: generates icons produced by icomoon tool, do not use this until I document it // TODO: document.

You can see the different available icons here
http://localhost/Cricket/Cricket.web/mockup/dummy/iconset.html

> PS: Using less in components, is possible, remember to start with `@import "sh.vars.less"`; and avoid styles that need to be mirrored for RTL.

