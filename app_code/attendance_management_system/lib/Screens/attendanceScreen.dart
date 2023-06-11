import 'package:attendance_management_system/Constants/color.dart';
import 'package:attendance_management_system/Screens/submit.dart';
import 'package:flutter/material.dart';
import 'package:flutter_slidable/flutter_slidable.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:gradient_slide_to_act/gradient_slide_to_act.dart';
import 'package:sizer/sizer.dart';

class attScreen extends StatefulWidget {
  const attScreen({super.key});

  @override
  State<attScreen> createState() => _attScreenState();
}

class _attScreenState extends State<attScreen> {
  @override
  Widget build(BuildContext context) {
    return Sizer(
      builder: (context, orientation, deviceType) {
        return Scaffold(
          appBar: AppBar(
            toolbarHeight: 70,
            centerTitle: true,
            title: const Text("Attendance"),
            backgroundColor: Color(0xff5e66e0),
            leading: GestureDetector(
              onTap: () {
                Navigator.pop(context);
              },
              child: const Icon(
                Icons.arrow_back_ios_new_rounded,
                color: Colors.white,
              ),
            ),
          ),
          body: SafeArea(
            child: ListView(
              children: [
                Column(
                  children: [
                    const SizedBox(
                      height: 20,
                    ),
                    const Text(
                      "Class: 4-A",
                      style: TextStyle(
                          color: Color(0xff5e66e0),
                          fontSize: 25,
                          fontFamily: 'PoppinsMed'),
                    ),
                    //Amanjot
                    const SizedBox(
                      height: 20,
                    ),
                    Slidable(
                      closeOnScroll: false,
                      endActionPane: ActionPane(
                        motion: const StretchMotion(),
                        children: [
                          SlidableAction(
                            icon: Icons.check_circle_outline_rounded,
                            backgroundColor: Colors.green.shade400,
                            borderRadius: BorderRadius.circular(15),
                            // spacing: 5,
                            onPressed: (context) {
                              print("Present");
                              Fluttertoast.showToast(
                                  msg: "Present",
                                  toastLength: Toast.LENGTH_SHORT,
                                  gravity: ToastGravity.BOTTOM,
                                  timeInSecForIosWeb: 5,
                                  backgroundColor: Colors.green.shade400,
                                  textColor: Colors.white,
                                  fontSize: 20);
                            },
                          ),
                        ],
                      ),
                      startActionPane: ActionPane(
                        motion: const StretchMotion(),
                        children: [
                          SlidableAction(
                            icon: Icons.cancel_outlined,
                            backgroundColor: Colors.red.shade400,
                            borderRadius: BorderRadius.circular(15),
                            // spacing: 3,
                            onPressed: (context) {
                              print("Absent");
                              Fluttertoast.showToast(
                                  msg: "Absent",
                                  toastLength: Toast.LENGTH_SHORT,
                                  gravity: ToastGravity.BOTTOM,
                                  timeInSecForIosWeb: 5,
                                  backgroundColor: Colors.red.shade400,
                                  textColor: Colors.white,
                                  fontSize: 20);
                            },
                          )
                        ],
                      ),
                      child: Padding(
                        padding: const EdgeInsets.only(left: 10, right: 10),
                        child: ListTile(
                          tileColor: Colors.grey.shade300,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(20),
                          ),
                          leading: const CircleAvatar(
                            backgroundImage:
                                AssetImage('assets/images/profile.jpg'),
                          ),
                          title: const Text('Amanjot Singh'),
                          subtitle: const Text("02121202021"),
                        ),
                      ),
                    ),
                    //Anas
                    const SizedBox(
                      height: 15,
                    ),
                    Slidable(
                      closeOnScroll: false,
                      endActionPane: ActionPane(
                        motion: const StretchMotion(),
                        children: [
                          SlidableAction(
                            icon: Icons.check_circle_outline_rounded,
                            backgroundColor: Colors.green.shade400,
                            borderRadius: BorderRadius.circular(15),
                            // spacing: 5,
                            onPressed: (context) {
                              print("Present");
                              Fluttertoast.showToast(
                                  msg: "Present",
                                  toastLength: Toast.LENGTH_SHORT,
                                  gravity: ToastGravity.BOTTOM,
                                  timeInSecForIosWeb: 3,
                                  backgroundColor: Colors.green.shade400,
                                  textColor: Colors.white,
                                  fontSize: 20);
                            },
                          ),
                        ],
                      ),
                      startActionPane: ActionPane(
                        motion: const StretchMotion(),
                        children: [
                          SlidableAction(
                            icon: Icons.cancel_outlined,
                            backgroundColor: Colors.red.shade400,
                            borderRadius: BorderRadius.circular(15),
                            // spacing: 3,
                            onPressed: (context) {
                              print("Absent");
                              Fluttertoast.showToast(
                                  msg: "Absent",
                                  toastLength: Toast.LENGTH_SHORT,
                                  gravity: ToastGravity.BOTTOM,
                                  timeInSecForIosWeb: 3,
                                  backgroundColor: Colors.red.shade400,
                                  textColor: Colors.white,
                                  fontSize: 20);
                            },
                          )
                        ],
                      ),
                      child: Padding(
                        padding: const EdgeInsets.only(left: 10, right: 10),
                        child: ListTile(
                          tileColor: Colors.grey.shade300,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(20),
                          ),
                          leading: const CircleAvatar(
                            backgroundImage:
                                AssetImage('assets/images/profile.jpg'),
                          ),
                          title: const Text('Anas Saifi'),
                          subtitle: const Text("03121202021"),
                        ),
                      ),
                    ),
                    //Harsh
                    const SizedBox(
                      height: 15,
                    ),
                    Slidable(
                      closeOnScroll: false,
                      endActionPane: ActionPane(
                        motion: const StretchMotion(),
                        children: [
                          SlidableAction(
                            icon: Icons.check_circle_outline_rounded,
                            backgroundColor: Colors.green.shade400,
                            borderRadius: BorderRadius.circular(15),
                            // spacing: 5,
                            onPressed: (context) {
                              print("Present");
                              Fluttertoast.showToast(
                                  msg: "Present",
                                  toastLength: Toast.LENGTH_SHORT,
                                  gravity: ToastGravity.BOTTOM,
                                  timeInSecForIosWeb: 3,
                                  backgroundColor: Colors.green.shade400,
                                  textColor: Colors.white,
                                  fontSize: 20);
                            },
                          ),
                        ],
                      ),
                      startActionPane: ActionPane(
                        motion: const StretchMotion(),
                        children: [
                          SlidableAction(
                            icon: Icons.cancel_outlined,
                            backgroundColor: Colors.red.shade400,
                            borderRadius: BorderRadius.circular(15),
                            // spacing: 3,
                            onPressed: (context) {
                              print("Absent");
                              Fluttertoast.showToast(
                                  msg: "Absent",
                                  toastLength: Toast.LENGTH_SHORT,
                                  gravity: ToastGravity.BOTTOM,
                                  timeInSecForIosWeb: 3,
                                  backgroundColor: Colors.red.shade400,
                                  textColor: Colors.white,
                                  fontSize: 20);
                            },
                          )
                        ],
                      ),
                      child: Padding(
                        padding: const EdgeInsets.only(left: 10, right: 10),
                        child: ListTile(
                          tileColor: Colors.grey.shade300,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(20),
                          ),
                          leading: const CircleAvatar(
                            backgroundImage:
                                AssetImage('assets/images/profile.jpg'),
                          ),
                          title: const Text('Harsh Agnihotri'),
                          subtitle: const Text("04121202021"),
                        ),
                      ),
                    ),
                    //Aryan
                    const SizedBox(
                      height: 15,
                    ),
                    Slidable(
                      closeOnScroll: false,
                      endActionPane: ActionPane(
                        motion: const StretchMotion(),
                        children: [
                          SlidableAction(
                            icon: Icons.check_circle_outline_rounded,
                            backgroundColor: Colors.green.shade400,
                            borderRadius: BorderRadius.circular(15),
                            // spacing: 5,
                            onPressed: (context) {
                              print("Present");
                              Fluttertoast.showToast(
                                  msg: "Present",
                                  toastLength: Toast.LENGTH_SHORT,
                                  gravity: ToastGravity.BOTTOM,
                                  timeInSecForIosWeb: 3,
                                  backgroundColor: Colors.green.shade400,
                                  textColor: Colors.white,
                                  fontSize: 20);
                            },
                          ),
                        ],
                      ),
                      startActionPane: ActionPane(
                        motion: const StretchMotion(),
                        children: [
                          SlidableAction(
                            icon: Icons.cancel_outlined,
                            backgroundColor: Colors.red.shade400,
                            borderRadius: BorderRadius.circular(15),
                            // spacing: 3,
                            onPressed: (context) {
                              print("Absent");
                              Fluttertoast.showToast(
                                  msg: "Absent",
                                  toastLength: Toast.LENGTH_SHORT,
                                  gravity: ToastGravity.BOTTOM,
                                  timeInSecForIosWeb: 3,
                                  backgroundColor: Colors.red.shade400,
                                  textColor: Colors.white,
                                  fontSize: 20);
                            },
                          )
                        ],
                      ),
                      child: Padding(
                        padding: const EdgeInsets.only(left: 10, right: 10),
                        child: ListTile(
                          tileColor: Colors.grey.shade300,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(20),
                          ),
                          leading: const CircleAvatar(
                            backgroundImage:
                                AssetImage('assets/images/profile.jpg'),
                          ),
                          title: const Text('Aryan Kumar'),
                          subtitle: const Text("05121202021"),
                        ),
                      ),
                    ),
                    //Amit
                    const SizedBox(
                      height: 15,
                    ),
                    Slidable(
                      closeOnScroll: false,
                      endActionPane: ActionPane(
                        motion: const StretchMotion(),
                        children: [
                          SlidableAction(
                            icon: Icons.check_circle_outline_rounded,
                            backgroundColor: Colors.green.shade400,
                            borderRadius: BorderRadius.circular(15),
                            // spacing: 5,
                            onPressed: (context) {
                              print("Present");
                              Fluttertoast.showToast(
                                  msg: "Present",
                                  toastLength: Toast.LENGTH_SHORT,
                                  gravity: ToastGravity.BOTTOM,
                                  timeInSecForIosWeb: 3,
                                  backgroundColor: Colors.green.shade400,
                                  textColor: Colors.white,
                                  fontSize: 20);
                            },
                          ),
                        ],
                      ),
                      startActionPane: ActionPane(
                        motion: const StretchMotion(),
                        children: [
                          SlidableAction(
                            icon: Icons.cancel_outlined,
                            backgroundColor: Colors.red.shade400,
                            borderRadius: BorderRadius.circular(15),
                            // spacing: 3,
                            onPressed: (context) {
                              print("Absent");
                              Fluttertoast.showToast(
                                  msg: "Absent",
                                  toastLength: Toast.LENGTH_SHORT,
                                  gravity: ToastGravity.BOTTOM,
                                  timeInSecForIosWeb: 3,
                                  backgroundColor: Colors.red.shade400,
                                  textColor: Colors.white,
                                  fontSize: 20);
                            },
                          )
                        ],
                      ),
                      child: Padding(
                        padding: const EdgeInsets.only(left: 10, right: 10),
                        child: ListTile(
                          tileColor: Colors.grey.shade300,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(20),
                          ),
                          leading: const CircleAvatar(
                            backgroundImage:
                                AssetImage('assets/images/profile.jpg'),
                          ),
                          title: const Text('Amit Kumar'),
                          subtitle: const Text("06121202021"),
                        ),
                      ),
                    ),
                    //Aditya
                    const SizedBox(
                      height: 15,
                    ),
                    Slidable(
                      closeOnScroll: false,
                      endActionPane: ActionPane(
                        motion: const StretchMotion(),
                        children: [
                          SlidableAction(
                            icon: Icons.check_circle_outline_rounded,
                            backgroundColor: Colors.green.shade400,
                            borderRadius: BorderRadius.circular(15),
                            // spacing: 5,
                            onPressed: (context) {
                              print("Present");
                              Fluttertoast.showToast(
                                  msg: "Present",
                                  toastLength: Toast.LENGTH_SHORT,
                                  gravity: ToastGravity.BOTTOM,
                                  timeInSecForIosWeb: 3,
                                  backgroundColor: Colors.green.shade400,
                                  textColor: Colors.white,
                                  fontSize: 20);
                            },
                          ),
                        ],
                      ),
                      startActionPane: ActionPane(
                        motion: const StretchMotion(),
                        children: [
                          SlidableAction(
                            icon: Icons.cancel_outlined,
                            backgroundColor: Colors.red.shade400,
                            borderRadius: BorderRadius.circular(15),
                            // spacing: 3,
                            onPressed: (context) {
                              print("Absent");
                              Fluttertoast.showToast(
                                  msg: "Absent",
                                  toastLength: Toast.LENGTH_SHORT,
                                  gravity: ToastGravity.BOTTOM,
                                  timeInSecForIosWeb: 3,
                                  backgroundColor: Colors.red.shade400,
                                  textColor: Colors.white,
                                  fontSize: 20);
                            },
                          )
                        ],
                      ),
                      child: Padding(
                        padding: const EdgeInsets.only(left: 10, right: 10),
                        child: ListTile(
                          tileColor: Colors.grey.shade300,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(20),
                          ),
                          leading: const CircleAvatar(
                            backgroundImage:
                                AssetImage('assets/images/profile.jpg'),
                          ),
                          title: const Text('Aditya Singh Rawat'),
                          subtitle: const Text("07121202021"),
                        ),
                      ),
                    ),
                    //Sahil
                    const SizedBox(
                      height: 15,
                    ),
                    Slidable(
                      closeOnScroll: false,
                      endActionPane: ActionPane(
                        motion: const StretchMotion(),
                        children: [
                          SlidableAction(
                            icon: Icons.check_circle_outline_rounded,
                            backgroundColor: Colors.green.shade400,
                            borderRadius: BorderRadius.circular(15),
                            // spacing: 5,
                            onPressed: (context) {
                              print("Present");
                              Fluttertoast.showToast(
                                  msg: "Present",
                                  toastLength: Toast.LENGTH_SHORT,
                                  gravity: ToastGravity.BOTTOM,
                                  timeInSecForIosWeb: 3,
                                  backgroundColor: Colors.green.shade400,
                                  textColor: Colors.white,
                                  fontSize: 20);
                            },
                          ),
                        ],
                      ),
                      startActionPane: ActionPane(
                        motion: const StretchMotion(),
                        children: [
                          SlidableAction(
                            icon: Icons.cancel_outlined,
                            backgroundColor: Colors.red.shade400,
                            borderRadius: BorderRadius.circular(15),
                            // spacing: 3,
                            onPressed: (context) {
                              print("Absent");
                              Fluttertoast.showToast(
                                  msg: "Absent",
                                  toastLength: Toast.LENGTH_SHORT,
                                  gravity: ToastGravity.BOTTOM,
                                  timeInSecForIosWeb: 3,
                                  backgroundColor: Colors.red.shade400,
                                  textColor: Colors.white,
                                  fontSize: 20);
                            },
                          )
                        ],
                      ),
                      child: Padding(
                        padding: const EdgeInsets.only(left: 10, right: 10),
                        child: ListTile(
                          tileColor: Colors.grey.shade300,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(20),
                          ),
                          leading: const CircleAvatar(
                            backgroundImage:
                                AssetImage('assets/images/profile.jpg'),
                          ),
                          title: const Text('Sahil'),
                          subtitle: const Text("08121202021"),
                        ),
                      ),
                    ),
                    //Purvansh
                    const SizedBox(
                      height: 15,
                    ),
                    Slidable(
                      closeOnScroll: false,
                      endActionPane: ActionPane(
                        motion: const StretchMotion(),
                        children: [
                          SlidableAction(
                            icon: Icons.check_circle_outline_rounded,
                            backgroundColor: Colors.green.shade400,
                            borderRadius: BorderRadius.circular(15),
                            // spacing: 5,
                            onPressed: (context) {
                              print("Present");
                              Fluttertoast.showToast(
                                  msg: "Present",
                                  toastLength: Toast.LENGTH_SHORT,
                                  gravity: ToastGravity.BOTTOM,
                                  timeInSecForIosWeb: 3,
                                  backgroundColor: Colors.green.shade400,
                                  textColor: Colors.white,
                                  fontSize: 20);
                            },
                          ),
                        ],
                      ),
                      startActionPane: ActionPane(
                        motion: const StretchMotion(),
                        children: [
                          SlidableAction(
                            icon: Icons.cancel_outlined,
                            backgroundColor: Colors.red.shade400,
                            borderRadius: BorderRadius.circular(15),
                            // spacing: 3,
                            onPressed: (context) {
                              print("Absent");
                              Fluttertoast.showToast(
                                  msg: "Absent",
                                  toastLength: Toast.LENGTH_SHORT,
                                  gravity: ToastGravity.BOTTOM,
                                  timeInSecForIosWeb: 3,
                                  backgroundColor: Colors.red.shade400,
                                  textColor: Colors.white,
                                  fontSize: 20);
                            },
                          )
                        ],
                      ),
                      child: Padding(
                        padding: const EdgeInsets.only(left: 10, right: 10),
                        child: ListTile(
                          tileColor: Colors.grey.shade300,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(20),
                          ),
                          leading: const CircleAvatar(
                            backgroundImage:
                                AssetImage('assets/images/profile.jpg'),
                          ),
                          title: const Text('Purvansh'),
                          subtitle: const Text("09121202021"),
                        ),
                      ),
                    ),
                    //Shubham
                    const SizedBox(
                      height: 15,
                    ),
                    Slidable(
                      closeOnScroll: false,
                      endActionPane: ActionPane(
                        motion: const StretchMotion(),
                        children: [
                          SlidableAction(
                            icon: Icons.check_circle_outline_rounded,
                            backgroundColor: Colors.green.shade400,
                            borderRadius: BorderRadius.circular(15),
                            // spacing: 5,
                            onPressed: (context) {
                              print("Present");
                              Fluttertoast.showToast(
                                  msg: "Present",
                                  toastLength: Toast.LENGTH_SHORT,
                                  gravity: ToastGravity.BOTTOM,
                                  timeInSecForIosWeb: 3,
                                  backgroundColor: Colors.green.shade400,
                                  textColor: Colors.white,
                                  fontSize: 20);
                            },
                          ),
                        ],
                      ),
                      startActionPane: ActionPane(
                        motion: const StretchMotion(),
                        children: [
                          SlidableAction(
                            icon: Icons.cancel_outlined,
                            backgroundColor: Colors.red.shade400,
                            borderRadius: BorderRadius.circular(15),
                            // spacing: 3,
                            onPressed: (context) {
                              print("Absent");
                              Fluttertoast.showToast(
                                  msg: "Absent",
                                  toastLength: Toast.LENGTH_SHORT,
                                  gravity: ToastGravity.BOTTOM,
                                  timeInSecForIosWeb: 3,
                                  backgroundColor: Colors.red.shade400,
                                  textColor: Colors.white,
                                  fontSize: 20);
                            },
                          )
                        ],
                      ),
                      child: Padding(
                        padding: const EdgeInsets.only(left: 10, right: 10),
                        child: ListTile(
                          tileColor: Colors.grey.shade300,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(20),
                          ),
                          leading: const CircleAvatar(
                            backgroundImage:
                                AssetImage('assets/images/profile.jpg'),
                          ),
                          title: const Text('Shubham'),
                          subtitle: const Text("10021202021"),
                        ),
                      ),
                    ),
                    //Mohit
                    const SizedBox(
                      height: 15,
                    ),
                    Slidable(
                      closeOnScroll: false,
                      endActionPane: ActionPane(
                        motion: const StretchMotion(),
                        children: [
                          SlidableAction(
                            icon: Icons.check_circle_outline_rounded,
                            backgroundColor: Colors.green.shade400,
                            borderRadius: BorderRadius.circular(15),
                            // spacing: 5,
                            onPressed: (context) {
                              print("Present");
                              Fluttertoast.showToast(
                                  msg: "Present",
                                  toastLength: Toast.LENGTH_SHORT,
                                  gravity: ToastGravity.BOTTOM,
                                  timeInSecForIosWeb: 3,
                                  backgroundColor: Colors.green.shade400,
                                  textColor: Colors.white,
                                  fontSize: 20);
                            },
                          ),
                        ],
                      ),
                      startActionPane: ActionPane(
                        motion: const StretchMotion(),
                        children: [
                          SlidableAction(
                            icon: Icons.cancel_outlined,
                            backgroundColor: Colors.red.shade400,
                            borderRadius: BorderRadius.circular(15),
                            // spacing: 3,
                            onPressed: (context) {
                              print("Absent");
                              Fluttertoast.showToast(
                                  msg: "Absent",
                                  toastLength: Toast.LENGTH_SHORT,
                                  gravity: ToastGravity.BOTTOM,
                                  timeInSecForIosWeb: 3,
                                  backgroundColor: Colors.red.shade400,
                                  textColor: Colors.white,
                                  fontSize: 20);
                            },
                          )
                        ],
                      ),
                      child: Padding(
                        padding: const EdgeInsets.only(left: 10, right: 10),
                        child: ListTile(
                          tileColor: Colors.grey.shade300,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(20),
                          ),
                          leading: const CircleAvatar(
                            backgroundImage:
                                AssetImage('assets/images/profile.jpg'),
                          ),
                          title: const Text('Mohit'),
                          subtitle: const Text("11121202021"),
                        ),
                      ),
                    ),
                    //Rishabh
                    const SizedBox(
                      height: 15,
                    ),
                    Slidable(
                      closeOnScroll: false,
                      endActionPane: ActionPane(
                        motion: const StretchMotion(),
                        children: [
                          SlidableAction(
                            icon: Icons.check_circle_outline_rounded,
                            backgroundColor: Colors.green.shade400,
                            borderRadius: BorderRadius.circular(15),
                            // spacing: 5,
                            onPressed: (context) {
                              print("Present");
                              Fluttertoast.showToast(
                                  msg: "Present",
                                  toastLength: Toast.LENGTH_SHORT,
                                  gravity: ToastGravity.BOTTOM,
                                  timeInSecForIosWeb: 3,
                                  backgroundColor: Colors.green.shade400,
                                  textColor: Colors.white,
                                  fontSize: 20);
                            },
                          ),
                        ],
                      ),
                      startActionPane: ActionPane(
                        motion: const StretchMotion(),
                        children: [
                          SlidableAction(
                            icon: Icons.cancel_outlined,
                            backgroundColor: Colors.red.shade400,
                            borderRadius: BorderRadius.circular(15),
                            // spacing: 3,
                            onPressed: (context) {
                              print("Absent");
                              Fluttertoast.showToast(
                                  msg: "Absent",
                                  toastLength: Toast.LENGTH_SHORT,
                                  gravity: ToastGravity.BOTTOM,
                                  timeInSecForIosWeb: 3,
                                  backgroundColor: Colors.red.shade400,
                                  textColor: Colors.white,
                                  fontSize: 20);
                            },
                          )
                        ],
                      ),
                      child: Padding(
                        padding: const EdgeInsets.only(left: 10, right: 10),
                        child: ListTile(
                          tileColor: Colors.grey.shade300,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(20),
                          ),
                          leading: const CircleAvatar(
                            backgroundImage:
                                AssetImage('assets/images/profile.jpg'),
                          ),
                          title: const Text('Rishabh'),
                          subtitle: const Text("12121202021"),
                        ),
                      ),
                    ),
                    const SizedBox(
                      height: 40,
                    ),
                    // ElevatedButton(
                    //   style: ElevatedButton.styleFrom(
                    //       backgroundColor: btColor,
                    //       shape: RoundedRectangleBorder(
                    //           borderRadius: BorderRadius.circular(20))),
                    //   onPressed: () {},
                    //   child: Text("Submit Attendance"),
                    // ),
                    GradientSlideToAct(
                      text: 'Submit Attendance',
                      width: 300,
                      dragableIconBackgroundColor: Color(0xFF5e66e0),
                      textStyle: TextStyle(color: Colors.white, fontSize: 15),
                      backgroundColor: Color.fromARGB(167, 94, 103, 224),
                      onSubmit: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => submit(),
                          ),
                        );
                      },
                      gradient: const LinearGradient(
                          begin: Alignment.topLeft,
                          end: Alignment.bottomRight,
                          colors: [
                            Colors.green,
                            Colors.green,
                          ]),
                    ),
                    const SizedBox(
                      height: 50,
                    ),
                  ],
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}
