import React from 'react'
import ClipLoader from 'react-spinners/ClipLoader'


const override ={
    display: "block",
    margin: "100px auto"
}
const Loading = ({loading}) => {

  return (
    <div>
        <ClipLoader
        color="#3b82f6"
        loading={loading}
        cssOverride={override}
        size={150}
        arial-label="Loading Spinner"
        />
    </div>
  )
}

export default Loading