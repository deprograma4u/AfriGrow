
export interface validateFormDataType {
    fname?: string;
    experience?: string;
    name?: string;
    lname?: string;
    farmSize?: string;
    email?: string;
    mainCrops?: string;
    phone?: string;
    account?: string;
    address1?: string;
    // zip?: string;
    country?: string;
    city?: string;
    region?: string;
    language?: string;
    agreePolicy?: string;
    agreeCheckout?: string;
  }


export const validateFormData = (formData: validateFormDataType) => {
    const errors = {
      fname: '',
      experience: '',
      name: '',
      lname: '',
      farmSize: '',
      email: '',
      mainCrops: '',
      phone: '',
      account: '',
      address1: '',
      // zip: '',
      country: '',
      city: '',
      region: '',
      language: '',
      agreePolicy: "",
      agreeCheckout: "",
    };
  
    if (formData.hasOwnProperty('name')) {
      if (!formData?.name?.trim()) {
        errors.name = 'Please enter your first name';
      } else if (!/^[a-zA-Z-\s?]+$/.test(formData.name)) {
        errors.name = 'Please enter a valid first name';
      }
    }
  
    if (formData.hasOwnProperty('lname')) {
      if (!formData?.lname?.trim()) {
        errors.lname = 'Please enter your last name';
      } else if (!/^[a-zA-Z-]+$/.test(formData.lname)) {
        errors.lname = 'Please enter a valid last name';
      }
    }
  
    if (formData.hasOwnProperty('email')) {
      if (!formData?.email?.trim()) {
        errors.email = 'Please enter your email address';
      } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
        errors.email = 'Please enter a valid email address';
      }
    }
  
    if (formData.hasOwnProperty('phone')) {
      if (!formData?.phone?.trim()) {
        errors.phone = 'Please enter your phone number';
      } else if (!/^\d{10}$/.test(formData.phone)) {
        errors.phone = 'Please enter a valid phone number';
      }
    }
  
    if (formData.hasOwnProperty('account')) {
      if (!formData?.account?.trim()) {
        errors.account = 'Please enter your account number';
      }
      //  else if (!/^\d{10}$/.test(formData.account)) {
      //   errors.account = 'Please enter a valid account number';
      // }
    }
  
    if (formData.hasOwnProperty('address1')) {
      if (!formData?.address1?.trim()) {
        errors.address1 = 'Please enter your address';
      } else if (!/^[a-zA-Z0-9\s,.-]+$/.test(formData.address1)) {
        errors.address1 = 'Please enter a valid address';
      }
    }
  
    // if (formData.hasOwnProperty('zip')) {
    //   if (!formData?.zip?.trim()) {
    //     errors.zip = 'Please enter your zip code';
    //   } else if (!/^\d{5}$/.test(formData.zip)) {
    //     errors.zip = 'Please enter a valid zip code';
    //   }
    // }
  
    if (formData.hasOwnProperty('city')) {
      if (!formData?.city?.trim()) {
        errors.city = 'Please select your city';
      } else if (!/^[a-zA-Z\s]+$/.test(formData.city)) {
        errors.city = 'Please select a valid city';
      }
    }
  
    if (formData.hasOwnProperty('region')) {
      if (!formData?.region?.trim()) {
        errors.region = 'Please select your region';
      } else if (!/^[a-zA-Z\s]+$/.test(formData.region)) {
        errors.region = 'Please select a valid region';
      }
    }
  
    if (formData.hasOwnProperty('country')) {
      if (!formData?.country?.trim()) {
        errors.country = 'Please select your country';
      } else if (!/^[a-zA-Z\s]+$/.test(formData.country)) {
        errors.country = 'Please select a valid country';
      }
    }
  
    if (formData.hasOwnProperty('language')) {
      if (!formData?.language?.trim()) {
        errors.language = 'Please select your language';
      } else if (!/^[a-zA-Z\s]+$/.test(formData.language)) {
        errors.language = 'Please select a valid language';
      }
    }
    
    if (formData.hasOwnProperty('agreePolicy')) {
      if (!formData?.agreePolicy) {
        errors.agreePolicy = 'You must agree to our Terms and Conditions';
      }
    }

    if (formData.hasOwnProperty('agreeCheckout')) {
      if (!formData?.agreeCheckout) {
        errors.agreeCheckout = 'You must Accept this policy';
      }
    }
  
    return errors;
  };
