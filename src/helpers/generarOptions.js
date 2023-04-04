import React from 'react'

export const generarOptions = (arrContent = []) => {
    let templateHTML = ``
    

    arrContent.forEach(content => {
        templateHTML += 
        `
        <div
            class="option"
        >
            ${content}
        </div>
        `
    })

    return templateHTML;
    
    
}
