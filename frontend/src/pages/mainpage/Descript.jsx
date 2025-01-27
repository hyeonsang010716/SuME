import React from "react";

const Descript = () => {
  return(
    <div
      id="descript"
      className="w-full h-full flex flex-col p-4 gap-2 justify-start rounded-2xl shadow-md"
      style={{ background: "#F4F4F5", color:"#6B6B6B" }}
    >
      <h1 className="text-xl font-bold">설명</h1>
      <input type="text" className="w-full font-bold" style={{background:"#F4F4F5", color:"#6B6B6B"}} placeholder="공모전 회의" />
    </div>
  )
}

export default Descript