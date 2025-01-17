const router = require("express").Router()
const payslip = require("../models/Payslip");
const hod =require("../models/Hods");
const nodemailer =require("nodemailer")

//adding new payslip
router.post("/new_payslip", async (req, res) => {
    try {
      const find_hod=await hod.findOne({
        department:req.body.department
      })
      const find_payslip_id=await payslip.find();
      console.log({find_payslip_id})
      let updated_payslip_id;
      if(find_payslip_id){
        const pay_id=find_payslip_id[find_payslip_id?.length-1]?.payslip_id;
        let pay_var=(+pay_id.slice(5))+1
        updated_payslip_id="PAYSL"+pay_var

      }else{
        updated_payslip_id="PAYSL1000001";
      }
        const payload ={
            payslip_id:updated_payslip_id,
            name:req.body.name,
            email_id:req.body.email_id,
            phone:req.body.phone,
            department:req.body.department,
            details:req.body.details,
            amount:req.body.amount,
            cost_center:req.body.cost_center, 
            hod:find_hod?.name,

        }
      const payslip_add = new payslip(payload);
        const payslip_save = await payslip_add.save()
      res
        .status(200)
        .json({payslip_save});
    } catch (err) {
        console.log({err})
      res.status(500).json(err);
    }
  });


//fetch data for advance settlement
router.post("/fetch_advanceSettelement", async (req, res) => {
  try {
    const data_advance=await payslip.findOne({
      payslip_id:req.body.payslip_id
    })
    res
      .status(200)
      .json({data_advance});
  } catch (err) {
      console.log({err})
    res.status(500).json(err);
  }
});

//send email notification to acc department and person filling form
router.post("/payslip_mail_send", async (req, res) => {
    try {
      // sending mail to tutor
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "iskdhn.technical@gmail.com",
          pass: "wggbgqqhfwaiaint",
        },
      });
      var mailList = ['shiv7255918@gmail.com', 'iskdhn.technical@gmail.com','niraj.nitjsr@gmail.com'];

      let mailOptions = {
        from: "iskdhn.technical@gmail.com",
        to: mailList,
        subject: `${req.body.subject}`,
        html: `<h1><b>${
          req.body.payslip_id
        }</b></h1><br/>
        
          Name : ${req.body.name} <br/>
          Department : ${req.body.department} <br/>
          Email : ${req.body.email_id} <br/>
          Phone : ${req.body.phone} <br/>
          Cost Center : ${req.body.cost_center} <br/>
          Amount :₹ ${req.body.amount} <br/>
          Details :<br/> ${req.body.details} <br/>
          
        <br /><p>Thanks,</p><p>Accounts Department</p><p>Email: iskdhn.technical@gmail.com, Contact: +917255918744</p><br/><br /><footer><p>Copyright © 2020 Tutorpoint. All rights reserved Abhay Education Pvt. Ltd.</p></footer>`,
      };
  
      await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
  
    //   if (req.body.medium == "mail") {
    //     const updateSession = await Session.findOneAndUpdate(
    //       { session_id: req.body.sessionId },
    //       {
    //         $push: { notified_tutors: req.body.notified_tutors },
    //       },
    //       {
    //         upsert: true,
    //         new: true,
    //         setDefaultsOnInsert: true,
    //       }
    //     );
    //     console.log(updateSession);
    //   }
  
      // const updateTutor = await Session.updateOne(
      //   { session_id: req.body.sessionId, "notified_tutors.tutor_id": req.body.tutorId },
      //   { $set: { "notified_tutors.$.medium" : 'wa-mail' } }
      // );
  
      res.status(200).json("Email sent");
    } catch (err) {
      console.log(err);
      res.status(500).json("Email not sent");
    }
  });

  //send email notification to acc department and person filling form for advance
router.post("/payslip_mail_send_advance", async (req, res) => {
  try {
    // sending mail to tutor
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "iskdhn.technical@gmail.com",
        pass: "wggbgqqhfwaiaint",
      },
    });
    var mailList = ['shiv7255918@gmail.com', 'satish@gmail.com','niraj.nitjsr@gmail.com'];

    let mailOptions = {
      from: "iskdhn.technical@gmail.com",
      to: mailList,
      subject: `${req.body.subject}`,
      html: `<h1><b>${
        req.body.payslip_id
      }</b>(Advance)</h1><br/>
      
        Name : ${req.body.name} <br/>
        Department : ${req.body.department} <br/>
        Email : ${req.body.email_id} <br/>
        Phone : ${req.body.phone} <br/>
        Cost Center : ${req.body.cost_center} <br/>
        Amount :₹ ${req.body.amount} <br/>
        Details :<br/> ${req.body.details} <br/>
        
      <br /><p>Thanks,</p><p>Accounts Department</p><p>Email: iskdhn.technical@gmail.com, Contact: +917255918744</p><br/><br /><footer><p>Copyright © 2020 Tutorpoint. All rights reserved Abhay Education Pvt. Ltd.</p></footer>`,
    };

    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

  //   if (req.body.medium == "mail") {
  //     const updateSession = await Session.findOneAndUpdate(
  //       { session_id: req.body.sessionId },
  //       {
  //         $push: { notified_tutors: req.body.notified_tutors },
  //       },
  //       {
  //         upsert: true,
  //         new: true,
  //         setDefaultsOnInsert: true,
  //       }
  //     );
  //     console.log(updateSession);
  //   }

    // const updateTutor = await Session.updateOne(
    //   { session_id: req.body.sessionId, "notified_tutors.tutor_id": req.body.tutorId },
    //   { $set: { "notified_tutors.$.medium" : 'wa-mail' } }
    // );

    res.status(200).json("Email sent");
  } catch (err) {
    console.log(err);
    res.status(500).json("Email not sent");
  }
});

 //send email notification to acc department and person filling form for advance settlement 
 router.post("/payslip_mail_send_advanceSettlement", async (req, res) => {
  try {

    const update_advance=await payslip.updateOne({
      payslip_id:req.body.payslip_id
    },{
      details:req.body.details
    })

    // sending mail to tutor
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "iskdhn.technical@gmail.com",
        pass: "wggbgqqhfwaiaint",
      },
    });
    var mailList = ['shiv7255918@gmail.com', 'iskdhn.technical@gmail.com'];

    let mailOptions = {
      from: "iskdhn.technical@gmail.com",
      to: mailList,
      subject: `${req.body.subject}`,
      html: `<h1><b>${
        req.body.payslip_id
      }</b>(Advance Settlement)</h1><br/>
      
        Name : ${req.body.name} <br/>
        Department : ${req.body.department} <br/>
        Email : ${req.body.email_id} <br/>
        Phone : ${req.body.phone} <br/>
        Cost Center : ${req.body.cost_center} <br/>
        Amount :₹ ${req.body.amount} <br/>
        Details :<br/> ${req.body.details} <br/>
        
      <br /><p>Thanks,</p><p>Accounts Department</p><p>Email: iskdhn.technical@gmail.com, Contact: +917255918744</p><br/><br /><footer><p>Copyright © 2020 Tutorpoint. All rights reserved Abhay Education Pvt. Ltd.</p></footer>`,
    };

    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

  //   if (req.body.medium == "mail") {
  //     const updateSession = await Session.findOneAndUpdate(
  //       { session_id: req.body.sessionId },
  //       {
  //         $push: { notified_tutors: req.body.notified_tutors },
  //       },
  //       {
  //         upsert: true,
  //         new: true,
  //         setDefaultsOnInsert: true,
  //       }
  //     );
  //     console.log(updateSession);
  //   }

    // const updateTutor = await Session.updateOne(
    //   { session_id: req.body.sessionId, "notified_tutors.tutor_id": req.body.tutorId },
    //   { $set: { "notified_tutors.$.medium" : 'wa-mail' } }
    // );

    res.status(200).json("Email sent");
  } catch (err) {
    console.log(err);
    res.status(500).json("Email not sent");
  }
});

// send mail to hod
router.post("/payslip_mail_send_hod", async (req, res) => {
  try {
    // sending mail to tutor
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "iskdhn.technical@gmail.com",
        pass: "wggbgqqhfwaiaint",
      },
    });
    // var mailList = 'shiv7255918@gmail.com';

    let mailOptions = {
      from: "iskdhn.technical@gmail.com",
      to: req.body.hod,
      subject: `${req.body.subject}`,
      html: `<h1><b>${
        req.body.payslip_id
      }</b></h1><br/>
      
        Name : ${req.body.name} <br/>
        Department : ${req.body.department} <br/>
        Email : ${req.body.email_id} <br/>
        Phone : ${req.body.phone} <br/>
        Cost Center : ${req.body.cost_center} <br/>
        Amount :₹ ${req.body.amount} <br/>
        Details :<br/> ${req.body.details} <br/>

        <button id="approve">Approve</button>&nbsp<button id="raiseQuery">Raise Query</button>
        
      <br /><p>Thanks,</p><p>Accounts Department</p><p>Email: iskdhn.technical@gmail.com, Contact: +917255918744</p><br/><br /><footer><p>Copyright © 2020 Tutorpoint. All rights reserved Abhay Education Pvt. Ltd.</p></footer>`,
    };

    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

  //   if (req.body.medium == "mail") {
  //     const updateSession = await Session.findOneAndUpdate(
  //       { session_id: req.body.sessionId },
  //       {
  //         $push: { notified_tutors: req.body.notified_tutors },
  //       },
  //       {
  //         upsert: true,
  //         new: true,
  //         setDefaultsOnInsert: true,
  //       }
  //     );
  //     console.log(updateSession);
  //   }

    // const updateTutor = await Session.updateOne(
    //   { session_id: req.body.sessionId, "notified_tutors.tutor_id": req.body.tutorId },
    //   { $set: { "notified_tutors.$.medium" : 'wa-mail' } }
    // );

    res.status(200).json("Email sent");
  } catch (err) {
    console.log(err);
    res.status(500).json("Email not sent");
  }
});

//send email notification to acc department and person filling form when it is approved
router.post("/payslip_approved", async (req, res) => {
  try {
    // sending mail to tutor
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "iskdhn.technical@gmail.com",
        pass: "wggbgqqhfwaiaint",
      },
    });
    var mailList = ['shiv7255918@gmail.com', 'iskdhn.technical@gmail.com'];

    let mailOptions = {
      from: "iskdhn.technical@gmail.com",
      to: mailList,
      subject: `Approved`,
      html: `<h3>Your request with payslip id <b>${req.body.payslip_id}</b> is <b> Approved</b></h3><br/>
        
        Name : ${req.body.name} <br/>
        Department : ${req.body.department} <br/>
        Email : ${req.body.email_id} <br/>
        Phone : ${req.body.phone} <br/>
        Cost Center : ${req.body.cost_center} <br/>
        Amount :₹ ${req.body.amount} <br/>
        Details :<br/> ${req.body.details} <br/>
        
      <br /><p>Thanks,</p><p>Accounts Department</p><p>Email: iskdhn.technical@gmail.com, Contact: +917255918744</p><br/><br /><footer><p>Copyright © 2020 Tutorpoint. All rights reserved Abhay Education Pvt. Ltd.</p></footer>`,
    };

    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

  //   if (req.body.medium == "mail") {
  //     const updateSession = await Session.findOneAndUpdate(
  //       { session_id: req.body.sessionId },
  //       {
  //         $push: { notified_tutors: req.body.notified_tutors },
  //       },
  //       {
  //         upsert: true,
  //         new: true,
  //         setDefaultsOnInsert: true,
  //       }
  //     );
  //     console.log(updateSession);
  //   }

    // const updateTutor = await Session.updateOne(
    //   { session_id: req.body.sessionId, "notified_tutors.tutor_id": req.body.tutorId },
    //   { $set: { "notified_tutors.$.medium" : 'wa-mail' } }
    // );

    res.status(200).json("Email sent");
  } catch (err) {
    console.log(err);
    res.status(500).json("Email not sent");
  }
});

//send email notification to acc department and person filling form when query is raised
router.post("/payslip_query_raised", async (req, res) => {
  try {
    // sending mail to tutor
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "iskdhn.technical@gmail.com",
        pass: "wggbgqqhfwaiaint",
      },
    });
    var mailList = ['shiv7255918@gmail.com', 'iskdhn.technical@gmail.com'];

    let mailOptions = {
      from: "iskdhn.technical@gmail.com",
      to: mailList,
      subject: `Query Raised`,
      html: `<h3>HOD has been queried on your payslip no. <b>${req.body.payslip_id}</b></h3><br/>

      <b>Query</b><br/>
        <p>${req.body.query}</p></br>
       <p style="color:light-gray" >
        Name : ${req.body.name} <br/>
        Department : ${req.body.department} <br/>
        Email : ${req.body.email_id} <br/>
        Phone : ${req.body.phone} <br/>
        Cost Center : ${req.body.cost_center} <br/>
        Amount :₹ ${req.body.amount} <br/>
        Details :<br/> ${req.body.details} <br/>
        </p>
      <br /><p>Thanks,</p><p>Accounts Department</p><p>Email: iskdhn.technical@gmail.com, Contact: +917255918744</p><br/><br /><footer><p>Copyright © 2020 Tutorpoint. All rights reserved Abhay Education Pvt. Ltd.</p></footer>`,
    };

    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

  //   if (req.body.medium == "mail") {
  //     const updateSession = await Session.findOneAndUpdate(
  //       { session_id: req.body.sessionId },
  //       {
  //         $push: { notified_tutors: req.body.notified_tutors },
  //       },
  //       {
  //         upsert: true,
  //         new: true,
  //         setDefaultsOnInsert: true,
  //       }
  //     );
  //     console.log(updateSession);
  //   }

    // const updateTutor = await Session.updateOne(
    //   { session_id: req.body.sessionId, "notified_tutors.tutor_id": req.body.tutorId },
    //   { $set: { "notified_tutors.$.medium" : 'wa-mail' } }
    // );

    res.status(200).json("Email sent");
  } catch (err) {
    console.log(err);
    res.status(500).json("Email not sent");
  }
});

  module.exports =router
  