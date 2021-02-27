import Editor from '/js/editor';

EditorJS = Editor.EditorJS;

const editor = new EditorJS({ 
    /** 
     * Id of Element that should contain the Editor 
     */ 
    autofocus: true,
    holder: 'editorjs', 
    
    /** 
     * Available Tools list. 
     * Pass Tool's class or Settings object for each Tool you want to use 
     */ 
    tools: { 
      header: Header, 
      list: List 
    }, 
  });

  console.log("Made it");