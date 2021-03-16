import EditorJS from '@editorjs/editorjs';
import ImageTool from '@editorjs/image';

const editor = new EditorJS({
    tools: {
        image: {
            class: ImageTool,
            config: {
                endpoints: {
                    byFile: '/admin/event/body-image-file', // Your backend file uploader endpoint
                    byUrl: '/admin/body-image-url', // Your endpoint that provides uploading by Url
                }
            }
        }
    },
    data: (typeof content !== 'undefined') ? content: {},
    readOnly: true,
    minHeight: 50,
});