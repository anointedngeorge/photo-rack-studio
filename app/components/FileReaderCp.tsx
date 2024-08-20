
"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useCallback, useEffect } from 'react';
import { BsDownload } from 'react-icons/bs';
import { IoShareSocialSharp } from 'react-icons/io5';
import { MdRemoveRedEye } from 'react-icons/md';
import { RiDeleteBin6Fill } from 'react-icons/ri';

const FileReaderCp: React.FC = () => {
  // Initial list of image sources
  const [imageSources, setImageSources] = useState<string[]>([]);

  // Handler for the start of the drag event
  const handleDragStart = useCallback((e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString());
    // e.currentTarget.classList.add('border');
  }, []);

  // Handler for the end of the drag event
  const handleDragEnd = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('animated');
  }, []);

  // Handler for the drag over event
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Necessary to allow dropping
  }, []);

  // Handler for the drop event
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>, dropIndex: number) => {
    e.preventDefault();
    const draggedIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
    
    // Reorder the imageSources array
    const updatedImageSources = [...imageSources];
    const [movedItem] = updatedImageSources.splice(draggedIndex, 1);
    updatedImageSources.splice(dropIndex, 0, movedItem);

    // Update state with the new order
    setImageSources(updatedImageSources);
  }, [imageSources]);

  console.log("Empty div");
  
  console.log(imageSources);
  


  async function getdata() {
    const response = await fetch('/api/fileuploader', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        return data
      } else {
       
      }
  }
  
  const [counter, setCounter] = useState(0)
  let count_add = 0;
  useEffect(() => {
      
        getdata().then(data => {
            const arr: React.SetStateAction<string[]>  = [];
            Array.from(data.files).map(item => {
                arr.push(`/uploads/${item}`)
            })
            setImageSources(arr);
        });
        // 

  }, [])
  // imageSources
  return (
    <div className='mt-10 relative'>
      {/* pre_loader function */}
      <div className={imageSources.length > 0 ? `hidden`:`absolute w-full z-50 flex place-content-center place-items-center`} >
          <span className="loading loading-dots loading-lg"></span>
      </div>
      {/*  */}
      <div className='grid grid-cols-3 gap-3 p-3' id='contentarea'>
        {imageSources.map((src, index) => (
          
          <div
            key={index}
            className='relative rounded-2xl flex  place-content-end h-80 bg-black cursor-pointer draggableElements'
            draggable={true}
            onDragStart={(e) => handleDragStart(e, index)}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
          >
            
            <Image
              src={src}
              fill={true}
              className='w-full h-full object-cover rounded-2xl brightness-75'
              sizes='300'
              alt={`Image ${index + 1}`}
              placeholder='blur'
              blurDataURL='/uploads/placeholder.jpg' // Optional: add a placeholder image for loading
            />
            {/*  */}
            <div className='absolute w-20 h-full  bg-main rounded-r-2xl flex place-content-center items-center'>
                <div>
                <div className='flex flex-col space-y-5'>
                  <div><Link title='Share' href={'#'}><IoShareSocialSharp className='size-6' color='#fff'  /></Link></div>
                  <div><Link title='Expand Image' href={'#'}><MdRemoveRedEye className='size-6' color='#fff'  /></Link></div>
                  <div><Link title='Download' href={'#'}><BsDownload className='size-6' color='#fff'  /></Link></div>
                  <div><Link title='Remove Permanently' href={"#"}><RiDeleteBin6Fill className='size-6' color='#fff'  /></Link></div>
              </div>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileReaderCp;
