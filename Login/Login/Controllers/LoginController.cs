using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Login.Models;
using Newtonsoft.Json;

namespace Login.Controllers
{
    public class LoginController : Controller
    {
        LmsContestEntities db = new LmsContestEntities();

        // GET: Login
        public ActionResult Index()
        {
            if (Session["Name"] != null)
            {
                return View();
            }
            return RedirectToAction("Register");
        }

        public ActionResult Logout()
        {
            Session["Name"] = null;

            return RedirectToAction("Register");

        }



        public ActionResult LoginUser(User user)
        {
            var status = "error";
            try
            {
                var person = db.Users.Where(x => x.Email == user.Email && x.Password == x.Password).SingleOrDefault();
                if(person.IsActive==true)
                {
                    Session["Name"] = person.Name;
                    Session["Role"] = person.RoleId;
                    status = JsonConvert.SerializeObject(person);
                }
                else
                {
                    status = "Warning! User is UnActivated..";
                }
            }
            catch (Exception ex)
            {
                Console.Write(ex.Message);
            }

            return Content(status);
        }

        public ActionResult Register()
        {


            return View();
        }

        public ActionResult RegisterUser([Bind(Include = "Name,Email,Password,City,RoleId,IsActive")] User user)
        {

            var status = "error";
            if (ModelState.IsValid)
            {

                db.Users.Add(user);
                db.SaveChanges();
                status = JsonConvert.SerializeObject(user);
            }
            return Content(status);
        }

        public ActionResult LoadRoles()
        {
            var status = "error";
            var list = db.Roles.ToList();
            status = JsonConvert.SerializeObject(list);

            return Content(status);
        }

       

    }
}