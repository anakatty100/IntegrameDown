const Event = require("./models/Event");
const Image = require("./models/Image");
const Location = require("./models/Location");

/* 
    Populate event DB

    Extra info:
    Note: JavaScript counts months from 0 to 11.
    January is 0. December is 11.
    5 numbers specify year, month, day, hour, and minute:
    var d = new Date(year, month, day, hour, minute);


*/

const images = [
    {
            
    },

]

const p1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non est luctus, viverra nisi sed, fringilla lorem. Maecenas sed suscipit urna. Nam aliquam lacus ut nisi hendrerit, at elementum dui iaculis. Aenean auctor varius felis, at semper lectus ornare eu. Quisque at ligula sit amet sem blandit lobortis. Phasellus vehicula suscipit sodales. In eget enim vulputate, ultrices turpis quis, egestas nulla. Sed eget faucibus turpis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec vitae ipsum sit amet erat vehicula feugiat sit amet vel elit. Vestibulum ultricies, risus eu viverra pellentesque, odio dolor porta urna, sit amet lacinia nisl mauris in neque. Ut eu euismod lacus. Maecenas orci tellus, pellentesque ut placerat ut, imperdiet ac felis. Praesent malesuada erat orci, nec porta dui tincidunt at. Duis scelerisque maximus congue.Maecenas viverra felis ac lacinia euismod. Maecenas quis auctor lacus. Morbi eu mauris sit amet tortor posuere ultricies eu ut dolor. Pellentesque malesuada dictum nibh eu scelerisque. Nulla nec pellentesque risus. Vivamus massa erat, laoreet quis mattis a, lobortis at neque. Quisque sem tortor, pretium non ex eget, luctus ultrices nunc. Sed sem diam, dignissim at tristique sit amet, gravida ac ligula. Donec ac commodo diam, nec porttitor dui. Integer finibus nisi nec facilisis semper.";
const p2 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non est luctus, viverra nisi sed, fringilla lorem. Maecenas sed suscipit urna. Nam aliquam lacus ut nisi hendrerit, at elementum dui iaculis. Aenean auctor varius felis, at semper lectus ornare eu. Quisque at ligula sit amet sem blandit lobortis. Phasellus vehicula suscipit sodales. In eget enim vulputate, ultrices turpis quis, egestas nulla. Sed eget faucibus turpis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec vitae ipsum sit amet erat vehicula feugiat sit amet vel elit. Vestibulum ultricies, risus eu viverra pellentesque, odio dolor porta urna, sit amet lacinia nisl mauris in neque. Ut eu euismod lacus. Maecenas orci tellus, pellentesque ut placerat ut, imperdiet ac felis. Praesent malesuada erat orci, nec porta dui tincidunt at. Duis scelerisque maximus congue.Maecenas viverra felis ac lacinia euismod. Maecenas quis auctor lacus. Morbi eu mauris sit amet tortor posuere ultricies eu ut dolor. Pellentesque malesuada dictum nibh eu scelerisque. Nulla nec pellentesque risus. Vivamus massa erat, laoreet quis mattis a, lobortis at neque. Quisque sem tortor, pretium non ex eget, luctus ultrices nunc. Sed sem diam, dignissim at tristique sit amet, gravida ac ligula. Donec ac commodo diam, nec porttitor dui. Integer finibus nisi nec facilisis semper.";
const p3 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non est luctus, viverra nisi sed, fringilla lorem. Maecenas sed suscipit urna. Nam aliquam lacus ut nisi hendrerit, at elementum dui iaculis. Aenean auctor varius felis, at semper lectus ornare eu. Quisque at ligula sit amet sem blandit lobortis. Phasellus vehicula suscipit sodales. In eget enim vulputate, ultrices turpis quis, egestas nulla. Sed eget faucibus turpis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec vitae ipsum sit amet erat vehicula feugiat sit amet vel elit. Vestibulum ultricies, risus eu viverra pellentesque, odio dolor porta urna, sit amet lacinia nisl mauris in neque. Ut eu euismod lacus. Maecenas orci tellus, pellentesque ut placerat ut, imperdiet ac felis. Praesent malesuada erat orci, nec porta dui tincidunt at. Duis scelerisque maximus congue.Maecenas viverra felis ac lacinia euismod. Maecenas quis auctor lacus. Morbi eu mauris sit amet tortor posuere ultricies eu ut dolor. Pellentesque malesuada dictum nibh eu scelerisque. Nulla nec pellentesque risus. Vivamus massa erat, laoreet quis mattis a, lobortis at neque. Quisque sem tortor, pretium non ex eget, luctus ultrices nunc. Sed sem diam, dignissim at tristique sit amet, gravida ac ligula. Donec ac commodo diam, nec porttitor dui. Integer finibus nisi nec facilisis semper.";


const dataInfo = [
        {
        title: "Evento 1",
        date: new Date(2021, 01, 22, 12, 00),
        price: 12,
        bookLink: "https://www.google.com/",
        lookEventLink: "https://www.facebook.com/",
        paragraph: p1,
        images: [{ type: Schema.Types.ObjectId, ref: 'Image' }],
        location: { type: Schema.Types.ObjectId, ref: 'Location' },
    },
]


const newEvent = new Event({
    title: String,
    date: Date,
    price: Number,
    bookLink: String,
    lookEventLink: String,
    paragraph: String,
    images: [{ type: Schema.Types.ObjectId, ref: 'Image' }],
    location: { type: Schema.Types.ObjectId, ref: 'Location' },

});