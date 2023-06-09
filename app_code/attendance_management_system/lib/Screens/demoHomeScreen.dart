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
          Container(
            padding:
                const EdgeInsets.only(top: 15, left: 15, right: 15, bottom: 10),
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
                      padding: const EdgeInsets.only(left: 340, top: 20),
                      child: CircleAvatar(
                        foregroundImage:
                            AssetImage('assets/images/profile.jpg'),
                        backgroundColor: Color(0xff5e66e0),
                      ),
                    ),
                  ],
                ),

                //Welcoming text
                Padding(
                  padding: EdgeInsets.only(top: 10, right: 180),
                  child: Text(
                    "Hello 👋 Amanjot ",
                    style: TextStyle(
                        fontFamily: 'PoppinsSemi',
                        fontSize: 25,
                        color: Colors.white),
                  ),
                ),
                SizedBox(
                  height: 30,
                ),
              ],
            ),
          ),
          //Your Classes
          Padding(
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
            padding: const EdgeInsets.only(left: 60, right: 60),
            child: Container(
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(10),
                border:
                    Border.all(color: const Color.fromARGB(172, 158, 158, 158)),
              ),
              child: const Row(
                children: [
                  const Column(
                    children: [
                      const Text(
                        "Web Dev with ",
                        style: TextStyle(
                            color: Colors.black,
                            fontFamily: 'PoppinsSemi',
                            fontSize: 20,
                            fontWeight: FontWeight.bold),
                      )
                    ],
                  ),
                ],
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
