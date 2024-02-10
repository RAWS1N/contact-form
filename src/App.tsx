import { useState, ChangeEvent } from "react";
import { Input, InputLabel} from './components'
import { Country, State } from "country-state-city";


function App() {
  const [contactForm, setContactForm] = useState({
    firstName: { value: "", error: "" },
    lastName: { value: "", error: "" },
    email: { value: "", error: "" },
    phone: { value: "", error: "" },
    country: { value: "", error: "" },
    state: { value: "", error: "" },
    message: { value: "", error: "" }
  })

  // regex to validate email address
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // regex to validate indian mobile number
  const mobileRegex = /^[6-9]\d{9}$/;

  // function to set error of input field
  const SetInputError = (name: string, error: string) => {
    setContactForm(prevState => ({
      ...prevState,
      [name]: {
        error: error
      }
    }))
  }

// function update form data for every field
  const handleFormChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setContactForm(prevState => ({ ...prevState, [name]: { value: value } }))
  }

  // function to submit the form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // preventing default refresh after submission
    e.preventDefault()
    // checking whether firstname has length or not
    if (!contactForm.firstName.value.length) {
      SetInputError("firstName", "this field is required")
      
    }
    // checking whether lastrname has length or not
    if (!contactForm.lastName.value.length) {
      SetInputError("lastName", "this field is required")

    }

    // validating email via email-regex
    if (!emailRegex.test(contactForm.email.value)) {
      SetInputError('email', 'please provide valid email address')
    }
    // validating phone number via phone-regex
    if (!mobileRegex.test(contactForm.phone.value)) {
      SetInputError('phone', "please provide valid phone number")
    }
    // checking wheter country selectet or not 
    if (!contactForm.country.value.length) {
      SetInputError('country', "please select an country")
    }

    // checking whether state selected or not
    if (!contactForm.state.value.length) {
      SetInputError('state', "please select an state")
      return
    }
    

  }






  return (
    <div className="h-[100dvh] w-[100dvw] flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className=" border  w-11/12 md:w-6/12 lg:w-6/12 bg-white px-4 py-4  rounded-md ">
        <h2 className="text-zinc-900 text-2xl text-center font-semibold mb-4">Contact Us</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-1.5 w-full h-full">
          <div className="space-y-1 w-full ">
            <InputLabel value="Your Name" required/>
            <div className="grid md:grid-cols-2 gap-2">
              <Input name="firstName" placeholder="First name" type="text" label="First Name" value={contactForm.firstName.value} handleChange={handleFormChange} required={true} error={contactForm.firstName.error} />
              <Input name="lastName" placeholder="Last name" type="text" label="First Name" value={contactForm.lastName.value} handleChange={handleFormChange} required={true} error={contactForm.lastName.error} />
            </div>
          </div>
          <div className="">
            <InputLabel value="Email Address" required/>
            <Input type="email" name="email" placeholder="Eg. example@email.com" label="First Name" value={contactForm.email.value} handleChange={handleFormChange} required={true} error={contactForm.email.error} />
          </div>
          <div>
            <InputLabel value="Phone" required/>
            <Input type="tel" name="phone" placeholder="Eg. 1234567890" label="First Name" value={contactForm.phone.value} handleChange={handleFormChange} required={true} error={contactForm.phone.error} />
          </div>
          <div className="flex flex-col gap-1">
            <InputLabel value="Country" required/>
            <div className="flex flex-col">
              <select className="select-el" onChange={handleFormChange} name="country" value={contactForm.country.value}>
                <option value="">Select Country</option>
                {Country &&
                  Country.getAllCountries().map((i) => (
                    <option value={i.isoCode} key={i.isoCode}>
                      {i.name}
                    </option>
                  ))}
              </select>
              {contactForm.country.error && contactForm.country.error.length > 0 && <small className="text-rose-500">{contactForm.country.error}</small>}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <InputLabel value="State" required/>
            <div className="flex flex-col">
              <select className="select-el" onChange={handleFormChange} name="state" value={contactForm.state.value}>
                <option value="">Select State</option>
                {State &&
                  State.getStatesOfCountry(contactForm.country.value).map((i) => (
                    <option value={i.isoCode} key={i.isoCode}>
                      {i.name}
                    </option>
                  ))}
              </select>
              {contactForm.country.error && contactForm.country.error.length > 0 && <small className="text-rose-500 ">{contactForm.country.error}</small>}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <InputLabel value="Message" />
            <textarea className="input indent-0 py-2 text-sm max-h-24 min-h-20  h-20" placeholder="type your message here..." name="message" value={contactForm.message.value} onChange={handleFormChange} />
          </div>
          <button  className="py-1 px-4 my-3 text-white rounded-md  bg-zinc-900 mx-auto w-full md:w-36 ">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default App
