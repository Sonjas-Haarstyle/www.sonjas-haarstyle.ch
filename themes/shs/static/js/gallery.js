import pictures from '../gallery.json' with {type: 'json'};

const dom = html => {
    const element = document.createElement("div");
    element.innerHTML = html;
    return element.children;
}


const Observable = value => {

    const listeners = [];

    return {
        onChange: callback => {
            listeners.push(callback);
            callback(value, value);
        },
        getValue: _ => value,
        setValue: newValue => {
            if (value === newValue) return;

            const oldValue = value;
            value = newValue;
            listeners.forEach(callback => {
                if (value === newValue) { // pre-ordered listeners might have changed this and thus the callback no longer applies
                    callback(value, oldValue);
                }
            });
        }
    }
};

const GalleryController = () => {
    const pathPic = "/pic/gallery/pics/";
    const pathThumbnail = "/pic/gallery/thumbnail/";

    const gallery = pictures;

    const index$ = Observable(0);
    const image$ = Observable(pathPic + gallery[0]);

    const updateImage = (idx) => {
        index$.setValue(idx);
        image$.setValue(pathPic + gallery[idx]);
    }

    return {
        thumbnails: gallery.map(g => pathThumbnail + g),

        onIndexChange: index$.onChange,
        onImageChange: image$.onChange,

        setIndex: idx => {
            updateImage(idx);
        },

        next: _ => {
            const i  = (index$.getValue() + 1) % gallery.length;
            updateImage(i);
        },

        last: _ => {
            const i  = (index$.getValue() + 1) % gallery.length;
            updateImage(i);
        }
    }
}


const projectThumbnail = (controller) => {
    const thumbnails = document.createElement("div");
    thumbnails.setAttribute("class", "grid grid-cols-3")

    controller.thumbnails.forEach((thumbnail , index)=> {
        const [tn] = dom(`<img src="${thumbnail}">`);
        tn.onclick = () => controller.setIndex(index);

        controller.onIndexChange((idx) => {
            if (idx === index){
                tn.setAttribute("class", "border-4 border-shs");
            }else
                tn.setAttribute("class", "")
        })
        thumbnails.appendChild(tn);
    });


    return thumbnails;
}


const projectGallery = (controller) => {


    const [left, right] = dom(`
        <a  class="border-2 border-shs  my-auto w-10 h-10 text-center" >&lt</a> 
        <a class="border-2 border-shs  my-auto w-10 h-10 text-center"  >&gt</a>
    `);

    const [image] = dom(`
        <img class="max-h-[32rem] mx-auto center">    
    `)

    controller.onImageChange(img => image.src = img);

    left.onclick = () => controller.last();
    right.onclick = () => controller.next();


    const root = document.createElement("div");
    root.setAttribute("class", "grid grid-cols-3")

    root.appendChild(left);
    root.appendChild(image);
    root.appendChild(right);

    return root;
}


export const projectApp = () => {
    const controller = GalleryController();
    const rootElement = document.getElementById('gallery');
    rootElement.setAttribute('class', 'grid grid-cols-2 grid-cols-[20%,80%]');


    rootElement.appendChild(projectThumbnail(controller));
    rootElement.appendChild(projectGallery(controller));
}

projectApp();

