import { useMemo, useRef, useState ,useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
export default function useCreatePost() {
    const editor = useRef(null);
    const [imageOFPost, setImageOfPost]=useState("")
    const [formData, setFormData]= useState({
        title:"",
        context:"",
        cover_image:""  
    })
	const [content, setContent] = useState('');

	const config = useMemo(() => ({
			readonly: false, 
			placeholder: 'Texto do Post',
      height: 350, 
		}),
		[]
	);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    
    const imgFile = URL.createObjectURL(acceptedFiles[0]);
    setImageOfPost(imgFile); 
  }, []);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': [] 
    },
    multiple: false 
  });
  return {
  formData,
  content,
  setContent,
  config,
  editor,getRootProps, getInputProps, isDragActive,
  imageOFPost,
  setFormData
  }
}
