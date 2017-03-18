using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Login.Models;
using Newtonsoft.Json;

namespace Login.Controllers
{
    public class ContactsDirController : Controller
    {
        LmsContestEntities db = new LmsContestEntities();
        // GET: ContactsDir
        
        public ActionResult Index()
        {
            return View();
        }


        public ActionResult LoadClients()
        {
            var status = "error";
            var list = db.Clients.ToList();
            status = JsonConvert.SerializeObject(list);

            return Content(status);
        }

        public ActionResult ContactAdd([Bind(Include = "Name,Designation,ContactNo,Email,IsActive,ClientId")] Customer customer)
        {
            var status ="error";
            if (ModelState.IsValid)
            {
                db.Customers.Add(customer);
                db.SaveChanges();
                status = JsonConvert.SerializeObject(customer);
            }
            return Content(status);
        }
    }
}