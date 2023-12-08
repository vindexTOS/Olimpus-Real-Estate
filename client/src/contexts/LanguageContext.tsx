import { jwtDecode } from "jwt-decode";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import Cookies from "universal-cookie";
import { UserType } from "../Types/user-types";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

type Cell = {
  setLang: React.Dispatch<React.SetStateAction<boolean>>;
  lang: boolean;
  translation: any;
  refrenceData: any;
};

const LanguageContext = createContext<Cell | null>(null);

export const LanguageContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [lang, setLang] = useState<boolean>(true);

  let translation = {
    form: {
      titles: {
        infoHeader: lang
          ? "დაამატეთ თქვენი უძრავი ქონება"
          : "Add your real estate",
        infoH1: lang ? "შეავსე ფორმა" : "Fill out the form",
        infoH2: lang ? "გამოაგზავნე ინფორმაცია" : "Send information",
        infoH3: lang
          ? "დაელოდე განცხადების დამტიკცებას"
          : "Wait for the approval",
        formHeader1: lang ? "თქვენი პირადი მონაცემები" : "Your personal data",
        formHeader2: lang ? "ინფორმაცია საკუთრებაზე" : "Property information",
        formHeader3: lang
          ? "დაამატეთ საკუთრების ფოტოები"
          : "Add property photos",
      },

      userInfo: {
        email: lang ? "ემაილი" : "Email",
        number: lang ? "ტელეფონის ნომერი" : "Phone Number",
        firstName: lang ? "სახელი" : "First Name",
        lastName: lang ? "გვარი" : "Last Name",
      },
      propertyInfo: {
        location: lang ? "ლოკაცია" : "Location",
        feature: lang ? "გარიგების ტიპი" : "Inquiry Type",
        propertyType: lang ? "საკუთრების ტიპი" : "Property Type",
        sqArea: lang ? "კვადრატობა" : "Squar meter",
        price: lang ? "ფასი" : "Price",
        buildYear: lang ? "აშენების თარიღი" : "Build year",
        title: lang ? "სათაური" : "Title",
        desc: lang ? "აღწერა" : "Description",
        submit: lang ? "გამოგზავნა" : "Submit",
      },
    },
    nav: {
      home: lang ? "მთავარი" : "Home",
      listing: lang ? "შემოთავაზებები" : "Listing",
      createNew: lang ? "განცხადების დამატება" : "Add Propertie",
      agents: lang ? "აგენტები" : "Agents",
    },
  };
  // SOLD;
  // ACTIVE;
  // PENDING;
  let refrenceData = {
    statusType: {
      data: [
        { title: lang ? "გაყიდულია" : "sold", key: "SOLD" },
        { title: lang ? "აქტიურია" : "active", key: "ACTIVE" },
        { title: lang ? "ელოდება განხილვას" : "pending", key: "PENDING" },
      ],
    },

    featureType: {
      data: [
        { title: lang ? "იყიდება" : "Sale", key: "SALE" },
        { title: lang ? "ქირავდება" : "rent", key: "RENT" },
      ],
    },
    propertyType: {
      data: [
        { title: lang ? "კერძო სახლი" : "Home", key: "HOUSE" },
        { title: lang ? "ბინა" : "Apartments", key: "APARTMENT" },
        { title: lang ? "საოფისე ფართი" : "Office", key: "OFFICE" },
        {
          title: lang ? "კომერციული ფართი" : "Commercial Space",
          key: "COMMERCIAL",
        },
      ],
    },
    location: {
      data: [
        { title: lang ? "თბილისი" : "Tbilisi", key: "tbilisi" },
        { title: lang ? "ქუთაისი" : "Kutaisi", key: "kutaisi" },
        { title: lang ? "ბათუმი" : "Batumi", key: "batumi" },
        { title: lang ? "რუსთავი" : "Rustavi", key: "rustavi" },
        { title: lang ? "ზუგდიდი" : "Zugdidi", key: "zugdidi" },
        { title: lang ? "საჩხერე" : "Sachkhere", key: "sachkhere" },
        { title: lang ? "ქობულეთი" : "Kobuleti", key: "kobuleti" },
        { title: lang ? "სიღნაღი" : "Signagi", key: "signagi" },
        { title: lang ? "ბორჯომი" : "Borjomi", key: "borjomi" },
        { title: lang ? "ახალტაბახი" : "Akhaltsikhe", key: "akhaltsikhe" },
        { title: lang ? "მარნეული" : "Marnueli", key: "marnueli" },
        { title: lang ? "დუშეთი" : "Dusheti", key: "dusheti" },
        { title: lang ? "ბაღდათი" : "Bagdati", key: "bagdati" },
        { title: lang ? "წალკა" : "Tsalka", key: "tsalka" },
        { title: lang ? "თეთრელი" : "Tetritskaro", key: "tetritskaro" },
        { title: lang ? "თელავი" : "Telavi", key: "telavi" },
        { title: lang ? "თიანეთი" : "Tianeti", key: "tianeti" },
        { title: lang ? "ზარე" : "Zare", key: "zare" },
        { title: lang ? "მარტვილი" : "Martvili", key: "martvili" },

        { title: lang ? "ქობულეთი" : "Kobuleti", key: "kobuleti" },
        { title: lang ? "ფოთი" : "Poti", key: "poti" },
        { title: lang ? "წყალტუბო" : "Tsalkubo", key: "tsalkubo" },
        { title: lang ? "დუშეთი" : "Dusheti", key: "dusheti" },
        { title: lang ? "ბაღდათი" : "Bagdati", key: "bagdati" },
        { title: lang ? "გორი" : "Gori", key: "gori" },
        { title: lang ? "ხაშური" : "Khachuri", key: "khachuri" },
        { title: lang ? "ხონი" : "Khoni", key: "khoni" },
        { title: lang ? "ზესტაფონი" : "Zestafoni", key: "zestafoni" },
        { title: lang ? "გურჯაანი" : "Gurjaani", key: "gurjaani" },
        { title: lang ? "წალენჯიხა" : "Tsalenjikha", key: "tsalenjikha" },
        { title: lang ? "წყალტუბო" : "Tsalkubo", key: "tsalkubo" },
        { title: lang ? "მარნეული" : "Marnueli", key: "marnueli" },
        {
          title: lang ? "დედოფლისწყარო" : "Dedoplistsqaro",
          key: "dedoplistsqaro",
        },
        { title: lang ? "მცხეთა" : "Mtskheta", key: "mtskheta" },
      ],
    },
  };

  return (
    <LanguageContext.Provider
      value={{ lang, setLang, translation, refrenceData }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const UseLanguageContext = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("Context Not Wrapped Reload Page");
  }

  return context;
};
