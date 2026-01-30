interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
    //To prevent compiler errors :)
  readonly NG_APP_TINYMCE_API_KEY: string;

}