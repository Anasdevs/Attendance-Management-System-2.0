import 'package:flutter/material.dart';

class demo extends StatefulWidget {
  const demo({super.key});

  @override
  State<demo> createState() => _demoState();
}

class _demoState extends State<demo> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // backgroundColor: Color(0xff5e66e0),
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
                        padding: const EdgeInsets.only(left: 140, top: 20),
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
          Padding(
            padding: const EdgeInsets.only(left: 30, right: 30),
            child: Material(
              elevation: 5,
              borderRadius: BorderRadius.circular(13),
              child: Container(
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(10),
                  border: Border.all(color: Color.fromARGB(134, 158, 158, 158)),
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
          //Second class
          Padding(
            padding: const EdgeInsets.only(left: 30, right: 30),
            child: Material(
              elevation: 5,
              borderRadius: BorderRadius.circular(13),
              child: Container(
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(10),
                  border: Border.all(color: Color.fromARGB(134, 158, 158, 158)),
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
          //Third class
          Padding(
            padding: const EdgeInsets.only(left: 30, right: 30),
            child: Material(
              elevation: 5,
              borderRadius: BorderRadius.circular(13),
              child: Container(
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(10),
                  border: Border.all(color: Color.fromARGB(134, 158, 158, 158)),
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
                  border: Border.all(color: Color.fromARGB(134, 158, 158, 158)),
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
          //Fifth class
          Padding(
            padding: const EdgeInsets.only(left: 30, right: 30),
            child: Material(
              elevation: 5,
              borderRadius: BorderRadius.circular(13),
              child: Container(
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(10),
                  border: Border.all(color: Color.fromARGB(134, 158, 158, 158)),
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
                  border: Border.all(color: Color.fromARGB(134, 158, 158, 158)),
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
          //Seventh class
          Padding(
            padding: const EdgeInsets.only(left: 30, right: 30),
            child: Material(
              elevation: 5,
              borderRadius: BorderRadius.circular(13),
              child: Container(
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(10),
                  border: Border.all(color: Color.fromARGB(134, 158, 158, 158)),
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
          //Eigth class
          Padding(
            padding: const EdgeInsets.only(left: 30, right: 30),
            child: Material(
              elevation: 5,
              borderRadius: BorderRadius.circular(13),
              child: Container(
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(10),
                  border: Border.all(color: Color.fromARGB(134, 158, 158, 158)),
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
