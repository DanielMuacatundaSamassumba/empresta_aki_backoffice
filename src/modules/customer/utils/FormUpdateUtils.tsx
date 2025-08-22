import React, { useEffect, useRef, useState } from 'react'
import type { CreateClientType } from '../types/CreateClientType'
import { useLocation, useNavigate } from 'react-router-dom';
import { showSweetAlert } from '@/shered-elements/utils/SweetAlertCustom';
import { api } from '@/api/api';
import useListBanks from '../services/useListBanks';
import useListProfissions from '../services/useListProfissions';
import type { dataBanksTypes } from '@/modules/banks/types/dataBanksTypes';
import Swal from 'sweetalert2';
export default function FormuUpdateUtils() {
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
  const [loader, setLoader] = useState(false)
  const [isLoding, setIsLoading] = useState(false)
  const [bank_code, setBankCode] = useState("0000")
  const [country_prefix, setCountry_prefix] = useState("AO06")
  const [sendMessage, setSendMessage] = useState("")
  const location = useLocation()
  const data: CreateClientType = location?.state?.data
  const navegate = useNavigate()

  const [formData, setFormData] = useState<CreateClientType>({
    bi_number: data.bi_number || "",
    phone_number: data.phone_number || "",
    profission_id: data?.profission?.id || "",
    monthlyIincome: data.monthlyIincome || "",
    biFrontImage: data.biFrontImage || [],
    biBackImage: data.biBackImage || [],
    profilePhoto: data.profilePhoto || [],
    iban: data?.iban?.includes("A006")
      ? data?.iban.split("A006.")[1]
      : data?.iban,
    accountNumber: data.accountNumber || "",
    bank_id: data.bank_id || "",
    email: data.email || "",
    statu_id: data?.status?.status_id || "",
    name: data.name || "",
    house_or_building_number: data.house_or_building_number || 0,
    multicaixaExpress: data.multicaixaExpress || "",
    birtday_date: data.birtday_date
      ? data.birtday_date.split("-").reverse().join("-")
      : "",
    city_id: data.city_id || "",
    house_number: data.address?.house_number || "0",
    street: data.address?.street || "0",
    marital_status: data?.marital_status || "",
    neighbourhood: data.address?.neighborhood || "",
  })
  const { dataProfissions } = useListProfissions()
  const { dataBanks } = useListBanks()

  useEffect(() => {
    if (data) {

      const bank = dataBanks.find(
        (item: dataBanksTypes) => item.bank_name == data.bank?.bank_name
      ) || { bank_prefix: "", id: "" };
      setBankCode(bank.bank_prefix)
      console.log(bank)
      const profission = dataProfissions.find(
        (item: { id: string, name: string }) => item.name == data.profission?.name
      ) || { id: "" };
      console.log(profission)
      setFormData({
        id: data.id || "",
        bi_number: data.bi_number || "",
        phone_number: data.phone_number || "",
        profission_id: profission.id || "",
        monthlyIincome: data.monthlyIincome,
        biFrontImage: data.biFrontImage || [],
        biBackImage: data.biBackImage || [],
        profilePhoto: data.profilePhoto || [],
        iban: data?.iban?.includes("A006")
          ? data?.iban.split("A006.")[1]
          : data?.iban,
        accountNumber: data.accountNumber || "",
        bank_id: bank.id,
        email: data.email || "",
        statu_id: data.status?.status_id || "",
        name: data.name || "",
        house_or_building_number: data.house_or_building_number || 0,
        multicaixaExpress: data.multicaixaExpress || "",
        birtday_date: data.birtday_date
          ? (() => {
            const [day, month, year] = data.birtday_date.split("-");
            const dayPadded = day.padStart(2, "0");
            const monthPadded = month.padStart(2, "0");
            return `${year}-${monthPadded}-${dayPadded}`;
          })()
          : "",
        city_id: data.city_id || "",
        residence: data.address?.residence || "",
        province: data.address?.province || "",
        municipality: data.address?.municipality || "",
        house_number: data.address?.house_number || "0",
        street: data?.address?.street || "0",
        marital_status: data?.marital_status,
        neighbourhood: data.address?.neighborhood || "",
      });

      setFrontalBiImage(`${data.path_front_identity_card}`);
      setFrontalImage(`${data.path_profile_photo}`);
      setBackBiImage(`${data.path_back_identity_card}`);
    }
    console.log("teste---->", formData)
  }, [data, dataProfissions, dataBanks]);
  console.log("teste---->", data)
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    console.log({ [name]: value })
    if (name == "name_banck") {
      setFormData((prev) => ({
        ...prev,
        [name]: value?.id,
      }))

      setCountry_prefix(value?.country_prefix)
      setBankCode(value?.bank_prefix)
      return;
    }
    if (name === "iban") {

      const rawValue = value.replace(/\W/gi, "").toUpperCase();
      const formattedValue = rawValue.match(/.{1,4}/g)?.join(".") || "";
      console.log(formattedValue)
      setFormData(prev => ({
        ...prev,
        [name]: formattedValue,
      }));
      return;
    }
    setFormData(prev => ({ ...prev, [name]: value }));
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
      setFormControl((prev) => prev == 2 ? 2 : prev + 1)
    } else {
      if (formControl == 1) {



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
    console.log("Daniel")
    setIsLoading(true)
    const frontalImage = frontalImageRef.current?.files?.[0];
    const frontalBiImage = frontalBiImageRef.current?.files?.[0];
    const backBiImage = backBiImageRef.current?.files?.[0];
    console.log("1", frontaImageIntoBd, frontalImage, frontalBiImage, backBiImage)
    console.log("2", frontaBiImageIntoBd)
    console.log("3", backBiImageIntoBd)

    const monthlyIincome = parseFloat(formData.monthlyIincome)
    console.log("---->", formData)
    try {
      const form = new FormData();
      form.append("email", formData.email);
      form.append("bi_number", formData.bi_number);
      form.append("phone_number", formData.phone_number);
      form.append("password", formData.bi_number);
      form.append("confirm_password", formData.bi_number);
      form.append("user_type", "customer");
      form.append("recive_message", String(formData.recive_message));
      form.append("iban", formData.iban);
      form.append("monthlyIincome", Number(monthlyIincome.toString()).toFixed(2));
      // Define a type guard function
      function isBankObject(obj: any): obj is { id: string } {
        return typeof obj === 'object' && obj !== null && 'id' in obj;
      }

      form.append("bank_id",
        isBankObject(formData.bank_id)
          ? formData.bank_id.id
          : formData.bank_id ?? ""
      );
      form.append("profission_id", formData.profission_id);
      form.append("name", formData.name);
      form.append("multicaixaExpress", String(formData.multicaixaExpress));
      form.append("accountNumber", formData.accountNumber);
      form.append("birtday_date", formData.birtday_date);
      form.append("municipality", String(formData.municipality));
      form.append("province", String(formData.province));
      form.append("street", String(formData.street));
      form.append("marital_status", String(formData.marital_status));
      form.append("neighborhood", String(formData.neighbourhood));
      form.append(
        "house_number",
        String(formData?.house_number)
      );
      form.forEach((value, key) => {
        console.log(`${key}:`, value);
      });
      form.append("statu_id", String(formData.statu_id));
      form.append("house_or_building_number", formData.house_or_building_number.toString());
      form.append("profilePhoto", frontaImageIntoBd as File)
      form.append("biFrontImage", frontaBiImageIntoBd as File)
      form.append("biBackImage", backBiImageIntoBd as File)
      console.log("iban", "AO06" + "." + bank_code + "." + formData.iban)
      console.log(Object.fromEntries(form.entries()));
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

      const response = await api.post(`backoffice/user-clients/update/${formData.id}`, form, {
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });
      console.log(response)

      Swal.fire({
        title: "Sucesso",
        text: "Cliente actualizado com Sucesso!",
        icon: "success",
        confirmButtonText: "OK"
      }).then((result) => {
        if (result.isConfirmed) {
          navegate("/customer")
        }
      });

      setIsLoading(false)
    } catch (error: any) {
      console.log("bank_id", formData.house_number)
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
    loader,
    navegate,
    setLoader
  }
}
