import React, { useRef, useState } from 'react'
import Swal from 'sweetalert2'
import type { CreateClientType } from '../types/CreateClientType'
import { showSweetAlert } from '@/shered-elements/utils/SweetAlertCustom'
import { useNavigate } from "react-router-dom"
import { api } from '@/api/api'
export default function FormUtils() {
  const frontalBiImageRef = useRef<HTMLInputElement | null>(null);
  const backBiImageRef = useRef<HTMLInputElement | null>(null);
  const frontalImageRef = useRef<HTMLInputElement | null>(null);
  const [frontaImageIntoBd, setFrontalImageIntoBd] = useState<File | undefined>()
  const [frontaBiImageIntoBd, setFrontaBiImageIntoBd] = useState<File | undefined>()
  const [backBiImageIntoBd, setBackBiImageIntoBd] = useState<File | undefined>()
  const [formControl, setFormControl] = useState<number>(0)
  const [frontalBiImage, setFrontalBiImage] = useState("")
  const [backBiImage, setBackBiImage] = useState("")
  const [frontalImage, setFrontalImage] = useState("")

  const [isLoding, setIsLoading] = useState(false)
  const [bank_code, setBankCode] = useState("0000")
  const [country_prefix, setCountry_prefix] = useState("AO06")
  const [sendMessage, setSendMessage] = useState("")
  const [formData, setFormData] = useState<CreateClientType>({
    birtday_date: "",
    bi_number: "",
    phone_number: "",
    profission_id: "",
    monthlyIincome: "",
    biFrontImage: [],
    biBackImage: [],
    profilePhoto: [],
    iban: "",
    accountNumber: "",
    bank_id: "",
    email: "",
    name: "",
    recive_message: "",
    multicaixaExpress: "",
    house_or_building_number: 0,
    city_id: "",
    street: "",
    marital_status: "",
    house_number: "",
    neighbourhood: "",
    municipality:"",
  
  })
  /*type BankType = {
    id: string;
    bank_name: string;
    short_name: string;
    country_prefix: string;
    bank_prefix: string;
  };*/
  const navegate = useNavigate()
  const handleChange = (e: any) => {
    const { name, value } = e.target;


    if (name == "bank_id") {
      setFormData((prev: any) => ({
        ...prev,
        [name]: value?.id,
      }))


      if (typeof value === 'object' && 'country_prefix' in value) {
        setCountry_prefix(value?.country_prefix);
        console.log(value);
      }
      setBankCode(value?.bank_prefix)
      return;
    }

    if (name === "iban") {

      const rawValue = value.replace(/\W/gi, "").toUpperCase();
      const formattedValue = rawValue.match(/.{1,4}/g)?.join(".") || "";
      console.log(formattedValue)
      setFormData((prev: any) => ({
        ...prev,
        [name]: formattedValue,
      }));
      return;
    }

    if (name === "bi_number") {
      setFormData((prev: any) => ({
        ...prev,
        [name]: value,
      }));
      return;
    }

    setFormData((prev: any) => ({ ...prev, [name]: value }));
    console.log(formData)
  }

  const formRef = useRef<HTMLFormElement | null>(null)
  function handleChangeFrontalImageBi(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const imgFile = URL.createObjectURL(file);
    console.log(frontalImageRef.current?.files);
    setFrontalBiImage(imgFile);

    setFormData((prev: any) => ({
      ...prev,
      biFrontImage: [file],
    }));
  }



  function handleChangeBackImageBi(e: { target: { files: (Blob | MediaSource)[]; }; }) {
    const imgFile = URL.createObjectURL(e.target.files[0])
    const fileToBd = e.target.files?.[0];
    setBackBiImage(imgFile)
    setFormData((prev: any) => ({
      ...prev,
      biBackImage: [fileToBd]
    }));
  }


  function handleChangeFrontalImage(e: { target: { files: (Blob | MediaSource)[]; }; }) {
    const imgFile = URL.createObjectURL(e.target.files[0])
    const fileToBd = e.target.files?.[0];
    setFrontalImage(imgFile)
    setFormData((prev: any) => ({
      ...prev,
      profilePhoto: [fileToBd],
    }));
    const fileFromRef = frontalImageRef.current?.files?.[0];
    const fileFromRef1 = frontalBiImageRef.current?.files?.[0];
    const fileFromRef2 = backBiImageRef.current?.files?.[0];
    setFrontalImageIntoBd(fileFromRef)
    setFrontaBiImageIntoBd(fileFromRef1)
    setBackBiImageIntoBd(fileFromRef2)
    console.log("1", fileFromRef)
    console.log("1", fileFromRef1)
    console.log("1", fileFromRef2)
  }

  const nextStep = () => {
    if (formRef.current && formRef.current.checkValidity()) {

      if (formControl == 0 && formData.phone_number.length < 9) {
        showSweetAlert({
          title: "Erro",
          text: "Número de Telefone Invalido",
          icon: "error"
        })
        formRef.current?.reportValidity();
        return;
      }
      setFormControl((prev) => prev == 2 ? 2 : prev + 1)
    } else {
      if (formControl == 5) {
        if (formData.biBackImage.length > 0 && formData.biBackImage.length > 0 && formData.profilePhoto.length > 0) {
          setFormControl((prev) => prev == 2 ? 2 : prev + 1)
        } else {
          Swal.fire({
            title: "Adicione Todas as Imagens",
            icon: "error"
          });
          console.log(formData)
        }


        return;
      }

      if (formControl == 0) {
        formRef.current?.reportValidity();
        return;
      }



    }

  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true)
    const frontalImage = frontalImageRef.current?.files?.[0];
    const frontalBiImage = frontalBiImageRef.current?.files?.[0];
    const backBiImage = backBiImageRef.current?.files?.[0];
    console.log("1", frontaImageIntoBd, frontalImage, frontalBiImage, backBiImage)
    console.log("2", frontaBiImageIntoBd)
    console.log("3", backBiImageIntoBd)



    try {
      const form = new FormData();
      const monthlyIincome = parseFloat(formData.monthlyIincome)
      const ibanCustumased = "0055" + "." + formData.iban
      console.log("iban---->", ibanCustumased)
      form.append("email", formData.email);
      form.append("bi_number", formData.bi_number);
      form.append("phone_number", formData.phone_number);
      form.append("password", formData.bi_number);
      form.append("confirm_password", formData.bi_number);
      form.append("user_type", "customer");
      form.append("recive_message", String(formData.recive_message));
      form.append("iban", ibanCustumased);
      form.append("monthlyIincome", Number(monthlyIincome.toString()).toFixed(2));
      form.append("bank_id", formData.bank_id);
      form.append("profission_id", formData.profission_id);
      form.append("name", formData.name);
      form.append("residence", String(formData.residence));
      form.append("multicaixaExpress", String(formData.multicaixaExpress));
      form.append("street", String(formData.street));
      form.append("marital_status", String(formData.marital_status));
      form.append("accountNumber", formData.accountNumber);
      form.append("birtday_date", formData.birtday_date);
      form.append("municipality", String(formData.municipality));
      form.append("province", String(formData.province));
      form.append("neighborhood", String(formData.neighbourhood));
      form.append(
        "house_number",
        String(formData?.house_number)
      );
      form.append("profilePhoto", frontaImageIntoBd as File)
      form.append("biFrontImage", frontaBiImageIntoBd as File)
      form.append("biBackImage", backBiImageIntoBd as File)
      console.log(monthlyIincome)
      form.forEach((value, key) => {
        console.log(`${key}:`, value);
      });
      /* const data = {
         email: formData.email,
         bi_number: formData.bi_number,
         phone_number: formData.phone_number,
         password: formData.phone_number,
         confirm_password: formData.phone_number,
         user_type: "customer",
         recive_message: formData.recive_message,
         iban: formData.iban,
         monthlyIncome: formData.monthlyIncome,
         bank_id: formData.bank_id,
         profission_id: formData.profission_id,
         name: formData.name,
         residence: formData.residence,
         multicaixaExpress:formData.multicaixaExpress,
         accountNumber:formData.accountNumber,
         birthday_date:formData.birthday_date,
         municipality:formData.municipality,
         biFrontImage:formData.biFrontImage,
         biBackImage:formData.biBackImage,
         profilePhoto:formData.profilePhoto,
         province:"324325",
         "accountNumber": "1234567890123456",
         "bank_id": "1",
         "bibackImage": "bi_back.jpg",
         "bifrontImage": "bi_front.jpg",
         "bi_number": "123456789LA123",
         "birthday_data": "1990-05-15",
         "city_id": "10",
         "email": "novo_email@example.com",
         "house_or_building_number": "25B",
         "iban": "AO06005500009234567210102",
         "monthlyIncome": 75000,
         "multicaixabzpress": "923456721",
         "phone_number": "923456721",
         "profilePhoto": "profile.jpg",
         "profission_id": "5"
       }*/
      const token = localStorage.getItem("token");

      const response = await api.post("/backoffice/user-clients", form, {
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });
      console.log(response)
      showSweetAlert({
        "title": "Sucesso",
        "text": "Cliente Cadastrado com Sucesso!",
        "icon": "success",
      })
      console.log("Data", formData)
      navegate("/customer")
      setIsLoading(false)
    } catch (error: any) {
      console.log("Data", formData)
      console.error("Submission error:", error);
      showSweetAlert({
        "title": "Erro",
        "text": error?.response.data.message,
        "icon": "error",
      })
      setIsLoading(false)
    }
  };
  return {
    frontalBiImageRef,
    backBiImageRef,
    frontalBiImage,
    setFrontalBiImage,
    backBiImage,
    setBackBiImage,
    frontalImage,
    setFrontalImage,
    frontalImageRef,
    handleChangeFrontalImage,
    handleChangeBackImageBi,
    handleChangeFrontalImageBi,
    formControl,
    setFormControl,
    formRef,
    nextStep,
    formData,
    handleChange,
    handleSubmit,
    setIsLoading,
    isLoding,
    setBankCode,
    setCountry_prefix,
    bank_code,
    country_prefix,
    sendMessage,
    setSendMessage,
  }
}
