


    const image = `<img id="gallery-image" class="max-h-[32rem] mx-auto">`
    const video = `<iframe 
        width="300" 
        height="150" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
    </iframe>`


    const initGalery = state => {
        document
            .getElementById("gallery")
            .innerHTML = `
                <div class="grid grid-cols-3">

                    <a  
                        class="border-2 border-shs  my-auto w-10 h-10 " 
                        onClick="state = last(state)">
                        &lt
                    </a> 
                    ${state.source}
                    <a 
                        class="border-2 border-shs  my-auto w-10 h-10 "  
                        onClick="state = next(state)">
                        &gt
                    </a>
                </div>
                `
        state.setSource(state)
        return state
    }


    const setPicture = state => {
        const image = document.getElementById("gallery-image");

        image.setAttribute("src", state.pictures[state.imageIndex]);
        
        return state
    }



    const setVideo= state => {

        const image = document.getElementById("gallery-image");

        image.setAttribute("src", state.pictures[state.imageIndex].src);
        image.setAttribute("title", state.pictures[state.imageIndex].title);
        
        const gallery = document.getElementById("gallery-image");

        
        return state;
    }


    // needed for the euklidian modulo
    const modulo = (n, m) => {
        const nm = n % m
        if (nm >= 0) 
            return nm

        return m + nm 
    }

    const lastIndex = state => ({
        ...state,
        imageIndex: modulo(state.imageIndex - 1, state.pictures.length)
    })

    const nextIndex = state => ({
        ...state,
        imageIndex: modulo(state.imageIndex + 1, state.pictures.length)
    })

    const next = state => setPicture (nextIndex (state)) 
    const last = state => setPicture (lastIndex (state)) 



