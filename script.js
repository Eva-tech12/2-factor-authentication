$("#check").hide();
$("#check1").hide();
$("#user_inp").hide();
$(".rootdiv").hide();
$(".welcome").hide();

particlesJS("particles-js", {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 631.3280775270874,
      },
    },
    color: {
      value: "#fff",
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#000000",
      },
      polygon: {
        nb_sides: 5,
      },
    },
    opacity: {
      value: 0.5,
      random: true,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 5,
      random: true,
      anim: {
        enable: false,
      },
    },
    line_linked: {
      enable: false,
    },
    move: {
      enable: true,
      speed: 1.5,
      direction: "bottom",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  retina_detect: true,
});

document.addEventListener("DOMContentLoaded", function () {
  var otpInputs = document.querySelectorAll(".otp-input");
  var emailOtpInputs = document.querySelectorAll(".email-otp-input");

  function setupOtpInputListeners(inputs) {
    inputs.forEach(function (input, index) {
      input.addEventListener("paste", function (ev) {
        var clip = ev.clipboardData.getData("text").trim();
        if (!/^\d{6}$/.test(clip)) {
          ev.preventDefault();
          return;
        }

        var characters = clip.split("");
        inputs.forEach(function (otpInput, i) {
          otpInput.value = characters[i] || "";
        });

        enableNextBox(inputs[0], 0);
        inputs[5].removeAttribute("disabled");
        inputs[5].focus();
        updateOTPValue(inputs);
      });

      input.addEventListener("input", function () {
        var currentIndex = Array.from(inputs).indexOf(this);
        var inputValue = this.value.trim();

        if (!/^\d$/.test(inputValue)) {
          this.value = "";
          return;
        }

        if (inputValue && currentIndex < 5) {
          inputs[currentIndex + 1].removeAttribute("disabled");
          inputs[currentIndex + 1].focus();
        }

        if (currentIndex === 4 && inputValue) {
          inputs[5].removeAttribute("disabled");
          inputs[5].focus();
        }

        updateOTPValue(inputs);
      });

      input.addEventListener("keydown", function (ev) {
        var currentIndex = Array.from(inputs).indexOf(this);

        if (!this.value && ev.key === "Backspace" && currentIndex > 0) {
          inputs[currentIndex - 1].focus();
        }
      });
    });
  }

  function updateOTPValue(inputs) {
    var otpValue = "";
    inputs.forEach(function (input) {
      otpValue += input.value;
    });

    if (inputs === otpInputs) {
      otp_inp = otpValue;
    } else if (inputs === emailOtpInputs) {
      otp_inp2 = otpValue;
    }
  }

  // Setup listeners for OTP inputs
  setupOtpInputListeners(otpInputs);
  setupOtpInputListeners(emailOtpInputs);

  // Add event listener for verify button
  document.getElementById("verifyMobileOTP").addEventListener("click", function () {
    if (page_state == "1"){
      if (otp_inp == totp.genOTP()){
        $(".mobile-otp").hide();
        $("#check").show();
        document.getElementById("tick").style.animationPlayState = 'running';
        document.getElementById("circle").style.animationPlayState = 'running';
        if ($("#check1").is(":visible")){
          $("#check").hide();
          $("#check1").hide();
          $(".welcome").show();
          $("#profile").attr("src","./Dependencies/profile.png");
          $(".welcome").html("Welcome, "+$("#user_inp").val());
          localStorage.setItem($("#mail_inp").val().replace(/\s+/g,'').toLowerCase(), JSON.stringify({"name":$("#user_inp").val(),"pass":$("#pass_inp").val(),"key":code_}));
        }
      }
      else{
        alert("Wrong OAuth OTP entered.");
      }}
    else if (page_state=="0"){
      var totp_ = new TOTP(JSON.parse(localStorage.getItem($("#mail_inp").val().replace(/\s+/g,'').toLowerCase()))["key"]);
      if (otp_inp == totp_.genOTP()){
        $(".mobile-otp").hide();
        $("#check").show();
        document.getElementById("tick").style.animationPlayState = 'running';
        document.getElementById("circle").style.animationPlayState = 'running';
        if ($("#check1").is(":visible")){
          $("#check").hide();
          $("#check1").hide();
          $(".welcome").show();
          $("#profile").attr("src","./Dependencies/profile.png");
          $(".welcome").html("Welcome, "+JSON.parse(localStorage.getItem($("#mail_inp").val().replace(/\s+/g,'').toLowerCase()))["name"]);
          localStorage.setItem($("#mail_inp").val().replace(/\s+/g,'').toLowerCase(), JSON.stringify({"name":$("#user_inp").val(),"pass":$("#pass_inp").val(),"key":code_}));
        }
      }
      else{
        alert("Wrong OAuth OTP entered.");
      }}
    // Add your submit logic here (e.g., AJAX request or form submission)
  });

  document.getElementById("verifyEmailOTP").addEventListener("click", function () {
    if (otp_inp2 == otp){
      $(".email-otp").hide();
      $("#check1").show();
      document.getElementById("tick1").style.animationPlayState = 'running';
      document.getElementById("circle1").style.animationPlayState = 'running';
      if ($("#check").is(":visible")){
        $("#check").hide();
        $("#check1").hide();
        $(".welcome").show();
        $("#profile").attr("src","./Dependencies/profile.png");
        if (page_state == "1"){
          $(".welcome").html("Welcome, "+$("#user_inp").val());
          localStorage.setItem($("#mail_inp").val().replace(/\s+/g,'').toLowerCase(), JSON.stringify({"name":$("#user_inp").val(),"pass":$("#pass_inp").val(),"key":code_}));
          }
        else{
          $(".welcome").html("Welcome, "+JSON.parse(localStorage.getItem($("#mail_inp").val().replace(/\s+/g,'').toLowerCase()))["name"]);
        }
      }
    // Add your submit logic here
    }
    else{
      alert("Wrong Email OTP entered.");
    }
  });

  // Initial focus on first OTP input field
  otpInputs[0].focus();
  emailOtpInputs[0].focus();
});

function sendmail(user_,otp_,type_,to_){
  if (type_ == 0){
    var type__ = "email address"
  } 
  else{
    var type__ = "identity"
  };
  emailjs.send("service_ibfrx2b","template_6tq2qtd",{
    user: user_,
    type: type__,
    otp: otp_,
    to: to_,});
  };

var code_ = TOTP.randomKey();
var otp= "";

function generateOTP() {
  otp= (Math.floor(100000 + Math.random() * 900000)).toString();
}

var otp_inp = "";
var otp_inp2 = "";

const totp = new TOTP(code_);

var page_state = "0"

$("#create_new").click(function(){
  if (page_state == "0"){
    page_state="1"
    $("#user_inp").show();
    $("#page_title").html("Create Account");
    $("#create_new").html("Already have an account?");
    $("#Sign").val("Sign up");
  }
  else if (page_state == "1"){
    page_state="0"
    $("#user_inp").hide();
    $("#page_title").html("Login");
    $("#create_new").html("Do no have an account?");
    $("#Sign").val("Sign in");
  }
});

$("#Sign").click(function(){
  if (page_state == "1"){
    if(localStorage.getItem($("#mail_inp").val().replace(/\s+/g,'').toLowerCase()) !== null){
      alert("An account already registered on this email.")}
    else{
      $(".rootdiv").show();
      $(".main").hide();
      generateOTP();
      sendmail($("#user_inp").val(),otp,0,$("#mail_inp").val().replace(/\s+/g,'').toLowerCase())
      $("#profile").attr("src","https://public-api.qr-code-generator.com/v1/create/free?image_format=SVG&image_width=500&foreground_color=%23000000&frame_color=%23000000&frame_name=no-frame&qr_code_logo=&qr_code_pattern=&qr_code_text=otpauth:%2F%2Ftotp%2FMinor+Project:+"+($("#mail_inp").val().replace(/\s+/g,'').toLowerCase().replace("@","%40"))+"%3Fsecret%3D"+code_);
    }}
  else if (page_state == "0"){
    if(localStorage.getItem($("#mail_inp").val().replace(/\s+/g,'').toLowerCase()) !== null){
      if ($("#pass_inp").val() == JSON.parse(localStorage.getItem($("#mail_inp").val().replace(/\s+/g,'').toLowerCase()))["pass"]){
        $(".rootdiv").show();
        $(".main").hide();
        generateOTP();
        sendmail(JSON.parse(localStorage.getItem($("#mail_inp").val().replace(/\s+/g,'').toLowerCase()))["name"],otp,1,$("#mail_inp").val().replace(/\s+/g,'').toLowerCase())
      }
      else{
        alert("Wrong Password.");
      }
    }
    else{
      alert("Account does not exist.");
    }
    
  }
});