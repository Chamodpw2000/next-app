'use client';

import React, { useState } from 'react'
import { CldUploadWidget,   CloudinaryUploadWidgetResults, CldImage } from 'next-cloudinary'
interface CloudinaryResult {
    public_id : string;
}
const UploadPage = () => {


    const [publicId, setPublicId] = useState('');
       
console.log('hello');
  return (


    <div>

        {publicId && <CldImage src={publicId} width={270} height={270} alt='Image'/>}


        <CldUploadWidget uploadPreset='nextapp'
        options={{sources:['local']}}
        onSuccess={(result:CloudinaryUploadWidgetResults) => {
          console.log(result);
          const info = result.info as CloudinaryResult;
          setPublicId(info.public_id);
            
        }} 
        
        
        
        >


{
    ({open})=>(<button className='btn btn-primary' onClick={()=>open()}>Upload</button>)
}

        </CldUploadWidget>
   

    </div>


  )
}

export default UploadPage


// 'use client';
// import React from 'react';
// import { CldUploadWidget } from 'next-cloudinary';

// const UploadPage = () => {
//   return (
//     <div>
    
//       <CldUploadWidget uploadPreset='nextapp'>
//         {({ open }) => (
//           <button className='btn btn-primary' onClick={() => open()}>
//             Upload
//           </button>
//         )}
//       </CldUploadWidget>
//     </div>
//   );
// };

// export default UploadPage;
