import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css"
import logo from "./careerkick_logo.png";
function Dropdown()
{
  const [users, setUser] = useState([]);
  const [result, setResult] = useState([]);
  const [insName, setInsName] = useState();
  const [selectedbranch, setSelectedBranch] = useState();
  const [selectedcategory, setSelectedCategory] = useState();
  const [selectedyear, setSelectedYear] = useState();
  const [selectedquota, setSelectedQuota] = useState();
  const [selectedgender, setSelectedGender] = useState();
  const [selectedround, setSelectedRound] = useState();
  const [req, setReq] = useState({
      stateName:"",
      cityName:""
  });
  const [stadium, setStadium] = useState([]);
  const [quota, setQuota] = useState([]);
  const [round, setRound] = useState([]);
  const [gender, setGender] = useState([]);
  const [seatType, setSeatType] = useState([]);
  const [year, setYear] = useState([]);
  // const { ids } = useParams();
  console.log(result,insName,selectedbranch,selectedcategory,selectedquota,selectedyear);
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost/react_dropdown/php_file_backend/fetch_state.php");
    setUser(result.data.reverse());
  };

  const selectBranch = (e)=>{
    let value = e.target.value;
    var data = value;
    setSelectedBranch(value);
    var response_quota = fetch("http://localhost/react_dropdown/php_file_backend/get_quota.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ insName,Branch:data}),
      }).then(function(response){
        return response.json();
      })
      .then(function(myJson) 
      {
        // console.log(myJson)
        setQuota(myJson)
      })

        var response_year = fetch("http://localhost/react_dropdown/php_file_backend/get_year.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ insName,Branch:data }),
          }).then(function(response){
            return response.json();
          })
          .then(function(myJson) 
          {
            // console.log(myJson)
            setYear(myJson);
          })

  }
  const selectYear = (e)=>{
    let value = e.target.value;
    setSelectedYear(value);
    var data=value;
    var response_seat = fetch("http://localhost/react_dropdown/php_file_backend/get_seat_type.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ insName,selectedbranch,Year:data}),
      }).then(function(response){
        return response.json();
      })
      .then(function(myJson) 
      {
        // console.log(myJson)
        setSeatType(myJson);
      })
      var response_round = fetch("http://localhost/react_dropdown/php_file_backend/get_round.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({insName,selectedbranch,Year:data}),
        }).then(function(response){
          return response.json();
        })
        .then(function(myJson) 
        {
          // console.log(myJson)
          setRound(myJson);
        })
        var response_gender = fetch("http://localhost/react_dropdown/php_file_backend/get_gender.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ insName,selectedbranch,Year:data }),
          }).then(function(response){
            return response.json();
          })
          .then(function(myJson) 
          {
            // console.log(myJson)
            setGender(myJson);
          })
  }
  const selectQuota = (e)=>{
    let value = e.target.value;
    setSelectedQuota(value);
  }
  const selectCategory = (e)=>{
    let value = e.target.value;
    setSelectedCategory(value);
  }
  const selectRound = (e)=>{
    let value = e.target.value;
    setSelectedRound(value);
  }
  const selectGender = (e)=>{
    let value = e.target.value;
    setSelectedGender(value);
  }
 
 
 
 
  // Code for Select city on State click
  const selectState =  (e) => {
    let name = e.target.name;
    let value = e.target.value;
    req[name] = value;
    var data = value;

    
  
     var response = fetch("http://localhost/react_dropdown/php_file_backend/fetch_records.php/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: data }),
      }).then(function(response){
        return response.json();
      })
      .then(function(myJson) 
      {
        setReq(myJson)
      })
  };


  const submit=(e)=>{
    e.preventDefault();
    
    var response_seat = fetch("http://localhost/react_dropdown/php_file_backend/on_submit.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({insName,selectedbranch,selectedcategory,selectedquota,selectedyear,selectedround,selectedgender}),
      }).then(function(response){
        return response.json();
      })
      .then(function(myJson) 
      {
        // console.log(myJson)
        setResult(myJson)
      })
  }

  

  const selectCity =  (e) => {
    let name = e.target.name;
    let value = e.target.value;
    req[name] = value;
    var data = value;
    
    setInsName(value);
  
     var response = fetch("http://localhost/react_dropdown/php_file_backend/get_stadium_address.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cityID: data }),
      }).then(function(response){
        return response.json();
      })
      .then(function(myJson) 
      {
        // console.log(myJson)
        setStadium(myJson)
      })
  };
  

  return(

  <div className="container-fluid">
    <nav class="navbar navbar-expand-lg navbar-dark bg-white">
      <img src={logo} className="logo"/>
    </nav>
    <div className="divider">
    </div>
    <div className="container">
    <div className="row">
    <div className="col-md-10 col-11 mx-auto " >
    <div className="row mt-4 gx-3 " >
    <div className="col-md-6 col-11 mx-auto my-5 p-5 shadow-lg rounded " style={{backgroundColor: "#161359"}} >
    <p className="text-center mt-1  lead" style={{color: "#fff",fontWeight: "500",fontSize: "24px",lineHeight: "30px",marginBottom: "2.5rem!important"}}>JOSSA Opening and Closing Ranks</p>

    <form onSubmit={submit}>
    <div className="my-4">
                            <div className="input-group">
                                <select className="form-select" onChange={selectState} style={{borderRadius: "1.25rem",}} ariaLabel="Default select example" name="insType" >

                                <option selected="" disabled="" value="">Institute Type</option>
                                
                                {users.map((user, index) => (
              <option value={user.id}>{user.stateName}</option>
            ))}
      
                                  </select>
  
                            </div>
                        </div>



                        <div className="my-4">
                            <div className="input-group">
                                <select className="form-select" onChange={selectCity} name="cityName" style={{borderRadius: "1.25rem",}} ariaLabel="Default select example"  >

                                <option selected="" disabled="" value="">Select Institute Name</option>
                                
                               
          {req && req.length>0 && req.map((user, index) => (
              <option value={user.id}>{user.City_Name}</option>
            ))}
        
      
                                  </select>
  
                            </div>
                        </div>


                        <div className="my-4">
                            <div className="input-group">
                                <select className="form-select"  name="cityName" id="stadium" onChange={selectBranch} style={{borderRadius: "1.25rem",}} ariaLabel="Default select example"  >

                                <option selected="" disabled="" value="">Branch</option>
                                
                               
                                {stadium && stadium.length>0 && stadium.map((user, index) => (
              <option value={user.id}>{user.Stadium_list}</option>
            ))}
        
      
                                  </select>
  
                            </div>
                        </div>
                        <div className="my-4">
                            <div className="input-group">
                                <select className="form-select"   id="address" onChange={selectQuota} style={{borderRadius: "1.25rem",}} ariaLabel="Default select example"  >

                                <option defaultValue>Quota</option>
                                
                               
                                {quota && quota.length>0 && quota.map((user, index) => (
              <option value={user.id}>{user.Stadium_Address}</option>
            ))}
      
                                  </select>
  
                            </div>
                        </div>

                        <div className="my-4">
                            <div className="input-group">
                                <select className="form-select"   onChange={selectYear} id="address"  style={{borderRadius: "1.25rem",}} ariaLabel="Default select example"  >

                                <option defaultValue>Year</option>
                                
                               
                                {quota && quota.length>0 && year.map((user, index) => (
              <option value={user.id}>{user.Year}</option>
            ))}
      
                                  </select>
  
                            </div>
                        </div>
                        <div className="my-4">
                            <div className="input-group">
                                <select className="form-select"   id="address"  onChange={selectCategory} style={{borderRadius: "1.25rem",}} ariaLabel="Default select example"  >

                                <option defaultValue>Category</option>
                                
                               
                                {stadium && stadium.length>0 && seatType.map((user, index) => (
              <option value={user.id}>{user.Seat_Type}</option>
            ))}
      
                                  </select>
  
                            </div>
                        </div>
                        <div className="my-4">
                            <div className="input-group">
                                <select className="form-select"   id="address" onChange={selectGender} style={{borderRadius: "1.25rem",}} ariaLabel="Default select example"  >

                                <option defaultValue>Gender</option>
                                
                                {stadium && gender.length>0 && gender.map((user, index) => (
              <option value={user.id}>{user.Gender}</option>
            ))}
      
                                  </select>
  
                            </div>
                        </div>



                        <div className="col-md-12 text-center mt-4">
                            <button className="btn btn-primary" type="submit"   id="mybtn" style={{backgroundColor: "crimson",
                            color: "#fff"}}>Submit</button>
                            
                        </div>





    </form>

    </div>
    </div>

    </div>
    </div>
    <div>
    {result.length>0 && result.map((user,index)=>(
      <div class="result">
      <h6><b>Round:</b>{user.Round}</h6>
      <h6><b>Year:</b>{user.Year}</h6>
      <h6><b>Institute Name:</b>{user.Institute_Name}</h6>
      <h6><b>Branch:</b>{user.Branch}</h6>
      <h6><b>Opening_Rank:</b>{user.Opening_Rank}</h6>
      <h6><b>Closing_Rank:</b>{user.Closing_Rank}</h6>
      <h6><b>Quota:</b>{user.Quota}</h6>
      <h6><b>Gender:</b>{user.Gender}</h6>
      </div>
    ))}
  </div>



  </div>
  </div>
  )
}
export default Dropdown;