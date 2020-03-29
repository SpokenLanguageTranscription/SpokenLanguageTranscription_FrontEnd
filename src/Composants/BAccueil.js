import React from 'react'

export default function BAccueil({children,title,subtitle}) {
    return (
        <div className="banner">
            <h1>{title}</h1>
            <div/>
            <h3>{subtitle}</h3>
            {children}
            
        </div>
    )
}