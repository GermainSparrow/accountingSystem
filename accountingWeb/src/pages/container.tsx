import React from 'react'
function Container(props: { children: React.ReactElement, auth: [number] }) {
    if (props.auth[0] > 5) {
        return null
    }
    else {
        return props.children
    }

}
export default Container