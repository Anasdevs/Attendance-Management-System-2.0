import 'package:attendance_management_system/Screens/attendanceScreen.dart';
import 'package:flutter/material.dart';
import 'package:flutter_expandable_fab/flutter_expandable_fab.dart';
import 'package:google_nav_bar/google_nav_bar.dart';

class demo extends StatefulWidget {
  const demo({super.key});

  @override
  State<demo> createState() => _demoState();
}

class _demoState extends State<demo> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      extendBody: true,
      floatingActionButtonLocation: ExpandableFab.location,
      floatingActionButton: ExpandableFab(
        collapsedFabSize: ExpandableFabSize.regular,
        expandedFabSize: ExpandableFabSize.regular,
        closeButtonStyle: const ExpandableFabCloseButtonStyle(
          backgroundColor: Color(0xff5e66e0),
        ),
        backgroundColor: const Color(0xff5e66e0),
        distance: 100,
        // fanAngle: 80,
        collapsedFabShape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
        expandedFabShape:
            RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        type: ExpandableFabType.fan,
        overlayStyle: ExpandableFabOverlayStyle(blur: 5),
        children: [
          FloatingActionButton(
            backgroundColor: const Color(0xff5e66e0),
            onPressed: () {},
            heroTag: null,
            enableFeedback: true,
            shape:
                RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            child: const Icon(Icons.add),
          ),
          FloatingActionButton(
            backgroundColor: const Color(0xff5e66e0),
            onPressed: () {},
            heroTag: null,
            enableFeedback: true,
            shape:
                RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            child: const Icon(Icons.settings),
          ),
          FloatingActionButton(
            backgroundColor: const Color(0xff5e66e0),
            onPressed: () {},
            heroTag: null,
            enableFeedback: true,
            shape:
                RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            child: const Icon(Icons.person),
          )
        ],
      ),
      bottomNavigationBar:
          // SafeArea(
          //   child: Container(
          //     padding: EdgeInsets.all(12),
          //     margin: EdgeInsets.symmetric(horizontal: 20),
          //     decoration: BoxDecoration(
          //       color: Color(0xff5e66e0),
          //       borderRadius: BorderRadius.all(
          //         Radius.circular(24),
          //       ),
          //     ),
          //     child: Row(
          //       children: [
          //         ImageIcon(
          //           AssetImage(
          //             'assets/images/login.png',
          //           ),
          //           size: 50,
          //         ),
          //       ],
          //     ),
          //   ),
          // ),
          const Padding(
        padding: EdgeInsets.only(top: 0, left: 0, right: 0, bottom: 0),
        child: Material(
          elevation: 30,
          child: GNav(
            // style: GnavStyle.google,
            backgroundColor: Color(0xff5e66e0),
            gap: 10,
            rippleColor: Color.fromARGB(103, 255, 255, 255),
            haptic: true,
            tabBorderRadius: 200,
            activeColor: Colors.white,
            tabBackgroundColor: Color.fromARGB(99, 255, 255, 255),
            padding: EdgeInsets.symmetric(horizontal: 18, vertical: 17),
            tabMargin: EdgeInsets.symmetric(horizontal: 10, vertical: 10),
            tabs: [
              GButton(
                icon: Icons.explore_outlined,
                iconColor: Colors.white,
                text: 'Home',
              ),
              GButton(
                icon: Icons.calendar_month_rounded,
                iconColor: Colors.white,
                text: 'Calendar',
              ),
              GButton(
                icon: Icons.file_present_outlined,
                iconColor: Colors.white,
                text: 'Report',
              ),
              GButton(
                icon: Icons.person_outline_rounded,
                iconColor: Colors.white,
                text: 'Profile',
              ),
            ],
          ),
        ),
      ),
      body: ListView(
        children: [
          //Profile picture
          Material(
            elevation: 10,
            borderRadius: BorderRadius.circular(30),
            child: Container(
              padding: const EdgeInsets.only(
                  top: 15, left: 15, right: 15, bottom: 10),
              decoration: const BoxDecoration(
                color: Color(0xff5e66e0),
                borderRadius: BorderRadius.only(
                  bottomLeft: Radius.circular(30),
                  bottomRight: Radius.circular(30),
                ),
              ),
              child: const Column(
                children: [
                  Row(
                    children: [
                      Padding(
                        padding: EdgeInsets.only(top: 27, left: 10),
                        child: Text(
                          "Hello 👋 Amanjot ",
                          style: TextStyle(
                              fontFamily: 'PoppinsSemi',
                              fontSize: 25,
                              color: Colors.white),
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.only(left: 100, top: 20),
                        child: CircleAvatar(
                          foregroundImage:
                              AssetImage('assets/images/profile.jpg'),
                          backgroundColor: Color(0xff5e66e0),
                        ),
                      ),
                    ],
                  ),
                  SizedBox(
                    height: 20,
                  ),
                  Row(
                    children: [
                      Padding(
                        padding: EdgeInsets.only(left: 10),
                        child: Icon(
                          Icons.mail_rounded,
                          color: Colors.white,
                        ),
                      ),
                      Text(
                        "  amanjot02121202021@msijanakpuri.com",
                        style: TextStyle(color: Colors.white, fontSize: 17),
                      )
                    ],
                  ),
                  SizedBox(
                    height: 20,
                  ),
                  Row(
                    children: [
                      Padding(
                        padding: EdgeInsets.only(left: 10),
                        child: Icon(
                          Icons.person,
                          color: Colors.white,
                        ),
                      ),
                      Text(
                        "  Associate Professor",
                        style: TextStyle(color: Colors.white, fontSize: 17),
                      )
                    ],
                  ),
                  SizedBox(
                    height: 15,
                  ),
                ],
              ),
            ),
          ),
          //Your Classes
          const Padding(
            padding: const EdgeInsets.only(left: 30, top: 20),
            child: Text(
              "Your Classes",
              style: TextStyle(
                  color: Colors.black, fontSize: 27, fontFamily: 'PoppinsSemi'),
            ),
          ),
          const SizedBox(
            height: 20,
          ),
          //Classes container
          GestureDetector(
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => const attScreen(),
                ),
              );
            },
            child: Padding(
              padding: const EdgeInsets.only(left: 30, right: 30),
              child: Material(
                elevation: 5,
                borderRadius: BorderRadius.circular(13),
                child: Container(
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(10),
                    border: Border.all(
                        color: const Color.fromARGB(134, 158, 158, 158)),
                  ),
                  child: const Row(
                    children: [
                      Column(
                        children: [
                          Padding(
                            padding: EdgeInsets.only(left: 20, top: 20),
                            child: Text(
                              "Web Dev with Django",
                              style: TextStyle(
                                  color: Colors.black,
                                  fontFamily: 'PoppinsSemi',
                                  fontSize: 20,
                                  fontWeight: FontWeight.bold),
                            ),
                          ),
                          Padding(
                            padding: const EdgeInsets.only(right: 115, top: 5),
                            child: Text(
                              "BCA",
                              style: TextStyle(
                                color: Colors.grey,
                                fontSize: 20,
                              ),
                            ),
                          ),
                          Padding(
                            padding:
                                EdgeInsets.only(right: 60, top: 5, left: 10),
                            child: Text(
                              "4th Semester",
                              style: TextStyle(
                                color: Colors.grey,
                                fontSize: 20,
                              ),
                            ),
                          ),
                          Padding(
                            padding: EdgeInsets.only(
                                right: 77, top: 5, left: 10, bottom: 20),
                            child: Text(
                              "Section - A",
                              style: TextStyle(
                                color: Colors.grey,
                                fontSize: 20,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
          const SizedBox(
            height: 20,
          ),
          //Second class
          Padding(
            padding: const EdgeInsets.only(left: 30, right: 30),
            child: Material(
              elevation: 5,
              borderRadius: BorderRadius.circular(13),
              child: Container(
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(10),
                  border: Border.all(
                      color: const Color.fromARGB(134, 158, 158, 158)),
                ),
                child: const Row(
                  children: [
                    Column(
                      children: [
                        Padding(
                          padding: EdgeInsets.only(left: 20, top: 20),
                          child: Text(
                            "Java Programming",
                            style: TextStyle(
                                color: Colors.black,
                                fontFamily: 'PoppinsSemi',
                                fontSize: 20,
                                fontWeight: FontWeight.bold),
                          ),
                        ),
                        Padding(
                          padding: const EdgeInsets.only(right: 100, top: 5),
                          child: Text(
                            "BCA",
                            style: TextStyle(
                              color: Colors.grey,
                              fontSize: 20,
                            ),
                          ),
                        ),
                        Padding(
                          padding: EdgeInsets.only(right: 35, top: 5),
                          child: Text(
                            "4th Semester",
                            style: TextStyle(
                              color: Colors.grey,
                              fontSize: 20,
                            ),
                          ),
                        ),
                        Padding(
                          padding:
                              EdgeInsets.only(right: 54, top: 5, bottom: 20),
                          child: Text(
                            "Section - B",
                            style: TextStyle(
                              color: Colors.grey,
                              fontSize: 20,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ),

          const SizedBox(
            height: 20,
          ),
          //Third class
          Padding(
            padding: const EdgeInsets.only(left: 30, right: 30),
            child: Material(
              elevation: 5,
              borderRadius: BorderRadius.circular(13),
              child: Container(
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(10),
                  border: Border.all(
                      color: const Color.fromARGB(134, 158, 158, 158)),
                ),
                child: const Row(
                  children: [
                    Column(
                      children: [
                        Padding(
                          padding: EdgeInsets.only(left: 20, top: 20),
                          child: Text(
                            "Software Engineering",
                            style: TextStyle(
                                color: Colors.black,
                                fontFamily: 'PoppinsSemi',
                                fontSize: 20,
                                fontWeight: FontWeight.bold),
                          ),
                        ),
                        Padding(
                          padding: const EdgeInsets.only(right: 115, top: 5),
                          child: Text(
                            "BCA",
                            style: TextStyle(
                              color: Colors.grey,
                              fontSize: 20,
                            ),
                          ),
                        ),
                        Padding(
                          padding: EdgeInsets.only(right: 60, top: 5, left: 10),
                          child: Text(
                            "4th Semester",
                            style: TextStyle(
                              color: Colors.grey,
                              fontSize: 20,
                            ),
                          ),
                        ),
                        Padding(
                          padding: EdgeInsets.only(
                              right: 77, top: 5, left: 10, bottom: 20),
                          child: Text(
                            "Section - A",
                            style: TextStyle(
                              color: Colors.grey,
                              fontSize: 20,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ),

          const SizedBox(
            height: 20,
          ),
          //Fourth class
          Padding(
            padding: const EdgeInsets.only(left: 30, right: 30),
            child: Material(
              elevation: 5,
              borderRadius: BorderRadius.circular(13),
              child: Container(
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(10),
                  border: Border.all(
                      color: const Color.fromARGB(134, 158, 158, 158)),
                ),
                child: const Row(
                  children: [
                    Column(
                      children: [
                        Padding(
                          padding: EdgeInsets.only(left: 20, top: 20),
                          child: Text(
                            "Digital Marketing",
                            style: TextStyle(
                                color: Colors.black,
                                fontFamily: 'PoppinsSemi',
                                fontSize: 20,
                                fontWeight: FontWeight.bold),
                          ),
                        ),
                        Padding(
                          padding: const EdgeInsets.only(right: 80, top: 5),
                          child: Text(
                            "BCA",
                            style: TextStyle(
                              color: Colors.grey,
                              fontSize: 20,
                            ),
                          ),
                        ),
                        Padding(
                          padding: EdgeInsets.only(right: 15, top: 5),
                          child: Text(
                            "4th Semester",
                            style: TextStyle(
                              color: Colors.grey,
                              fontSize: 20,
                            ),
                          ),
                        ),
                        Padding(
                          padding:
                              EdgeInsets.only(right: 35, top: 5, bottom: 20),
                          child: Text(
                            "Section - B",
                            style: TextStyle(
                              color: Colors.grey,
                              fontSize: 20,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ),
          const SizedBox(
            height: 20,
          ),
          //Fifth class
          Padding(
            padding: const EdgeInsets.only(left: 30, right: 30),
            child: Material(
              elevation: 5,
              borderRadius: BorderRadius.circular(13),
              child: Container(
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(10),
                  border: Border.all(
                      color: const Color.fromARGB(134, 158, 158, 158)),
                ),
                child: const Row(
                  children: [
                    Column(
                      children: [
                        Padding(
                          padding: EdgeInsets.only(left: 20, top: 20),
                          child: Text(
                            "Personality Dev. Skills",
                            style: TextStyle(
                                color: Colors.black,
                                fontFamily: 'PoppinsSemi',
                                fontSize: 20,
                                fontWeight: FontWeight.bold),
                          ),
                        ),
                        Padding(
                          padding: const EdgeInsets.only(right: 114, top: 5),
                          child: Text(
                            "BCA",
                            style: TextStyle(
                              color: Colors.grey,
                              fontSize: 20,
                            ),
                          ),
                        ),
                        Padding(
                          padding: EdgeInsets.only(right: 60, top: 5, left: 10),
                          child: Text(
                            "4th Semester",
                            style: TextStyle(
                              color: Colors.grey,
                              fontSize: 20,
                            ),
                          ),
                        ),
                        Padding(
                          padding: EdgeInsets.only(
                              right: 77, top: 5, left: 10, bottom: 20),
                          child: Text(
                            "Section - A",
                            style: TextStyle(
                              color: Colors.grey,
                              fontSize: 20,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ),
          const SizedBox(
            height: 20,
          ),
          //Sixth class
          Padding(
            padding: const EdgeInsets.only(left: 30, right: 30),
            child: Material(
              elevation: 5,
              borderRadius: BorderRadius.circular(13),
              child: Container(
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(10),
                  border: Border.all(
                      color: const Color.fromARGB(134, 158, 158, 158)),
                ),
                child: const Row(
                  children: [
                    Column(
                      children: [
                        Padding(
                          padding: EdgeInsets.only(left: 20, top: 20),
                          child: Text(
                            "Accountancy",
                            style: TextStyle(
                                color: Colors.black,
                                fontFamily: 'PoppinsSemi',
                                fontSize: 20,
                                fontWeight: FontWeight.bold),
                          ),
                        ),
                        Padding(
                          padding: const EdgeInsets.only(right: 30, top: 5),
                          child: Text(
                            "B.Com",
                            style: TextStyle(
                              color: Colors.grey,
                              fontSize: 20,
                            ),
                          ),
                        ),
                        Padding(
                          padding: EdgeInsets.only(left: 17, top: 5),
                          child: Text(
                            "6th Semester",
                            style: TextStyle(
                              color: Colors.grey,
                              fontSize: 20,
                            ),
                          ),
                        ),
                        Padding(
                          padding:
                              EdgeInsets.only(right: 1, top: 5, bottom: 20),
                          child: Text(
                            "Section - A",
                            style: TextStyle(
                              color: Colors.grey,
                              fontSize: 20,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ),
          const SizedBox(
            height: 40,
          ),

          // Container(
          //   child: Row(
          //     children: [

          //     ],
          //   ),
          // )
        ],
      ),
    );
  }
}
