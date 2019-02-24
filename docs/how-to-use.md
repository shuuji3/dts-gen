# dts-gen

Type definition for kintone customize and
Type definition generation tool from kintone form settings.


## Write kintone customize with TypeScript

In kintone JavaScript customize, there are functions which is defined in kintone.
When user try to write JavaScript customize, there are no definitions on typescript compile context.

So This tools has `kintone.d.ts` files which has a global function definition in TypeScript syntax manner. And then, you can write JavaScripot customize with TypeScript.

And This tools also contains command-line tool for type definition generator which
uses kintone form settings api.

## How to generate kintone-dts-gen

you can generate `sample-field.d.ts` like below:

```bash
kintone-dts-gen --host http://***.cybozu.com \
                 -u username \
                 -p password \
                 --app-id 12 \
                 --type-name SampleFields
                 --namespace company.name.types \
                 -o sample-fields.d.ts
```

kintone-dts-gen generates record field definition from kintone form settings.
And from this command line option, record field type definition(`company.name.types.SampleFields`)
is defined in `sample-fields.d.ts`.

**If you change form settings in kintone, Please re-generate type definition files**

### demo mode
If you won't have a kintone, you can try with demo mode.
you can generate demo type definition like below:

```bash
kintone-dts-gen --demo
```

kintone-dts-gen generates demo record field definition from demo data.
record field type definition(`kintone.types.Fields`)  is defined in `fields.d.ts`

### command line options
You can confirm command line options with `kintone-dts-gen --help`

### Write kintone JavaScript customize with TypeScript

tsconfig.json is like bellow:

```javascript
{
  "compilerOptions": {
    "allowSyntheticDefaultImports": true,
    "noFallthroughCasesInSwitch": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "esModuleInterop": true,
    "noUnusedLocals": true,
    "noImplicitAny": true,
    "declarationDir": "dist/types",
    "declaration": true,
    "target": "es5",
    "module": "es2015",
    "strict": true
  },
  "files" : [
    "./node_modules/@kintone/dts-gen/kintone.d.ts",
    "./src/sample-fields.d.ts"
  ],
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "dist",
    "node_modules"
  ]
}
```


And then write kintone customie with TypeScript.

```typescript

interface Event {
    appId: number;
    recordId: number;
    record: kintone.types.SavedDemoFields;
}

(() => {
    kintone.events.on("app.record.create.show", (event: Event) => {
        const appId = event.appId;
        const recordId = event.recordId;
        const type = event.record.Record_number.value;
    });
})();
```

1. Write tsconfig.json and add type definition file.

Add record field type definition and kintone builtin function type definition file in `files` properties.

2. Comiple With TypeScript
And then, You can compile with `tsc` command!
Welcome to TypeSafe kintone coding world!

#### Code auto completion

Define interface:
![typescript-interface](/images/typescript-interface.gif)

Call `kintone.events.on` function:
![call-function](/images/call-function.gif)

Compile error:
![compile-error](/images/compile-error.gif)

Subtable code completion:
![subtable](/images/subtable.gif)

### Write kintone JavaScript customize with JavaScript

If there are some reasons why you can't use TypeScript, you can use Type Definition as a types in jsdoc.

Write tsconfig.json which has type definition file.
And set `allowJs` attribute `true`.

If you work with VSCode, webstorm IDE or some IDE,you can gain power of code completion!


```javascript

(function() {
    kintone.events.on("test", function(event){
        /**
         * @type {DemoEvent}
         */
        const record = ev.record;
    });
})();
```
