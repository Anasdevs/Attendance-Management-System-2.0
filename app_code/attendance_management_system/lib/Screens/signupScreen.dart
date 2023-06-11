import 'package:attendance_management_system/Screens/demoHomeScreen.dart';
import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

class signupScreen extends StatefulWidget {
  const signupScreen({super.key});

  @override
  State<signupScreen> createState() => _signupScreenState();
}

class _signupScreenState extends State<signupScreen> {
  bool onPressed = false;
  @override
  Widget build(BuildContext context) {
    return Sizer(
      builder: (context, orientation, deviceType) {
        return Scaffold(
          backgroundColor: Colors.white,
          body: SafeArea(
            child: SingleChildScrollView(
              child: Column(
                children: [
                  Padding(
                    padding: const EdgeInsets.only(left: 50, right: 50, top: 0),
                    child: Image.asset(
                      'assets/images/signup.png',
                      // scale: ,
                    ),
                  ),
                  const Padding(
                    padding: EdgeInsets.only(right: 220),
                    child: Text(
                      "Sign Up",
                      style: TextStyle(
                          color: Color(0xFF5e66e0),
                          fontSize: 37,
                          fontFamily: 'PoppinsSemi'),
                    ),
                  ),
                  const SizedBox(
                    height: 15,
                  ),
                  Column(
                    children: [
                      Padding(
                        padding: const EdgeInsets.only(left: 30, right: 30),
                        child: TextFormField(
                          style:
                              const TextStyle(color: Colors.grey, fontSize: 20),
                          textInputAction: TextInputAction.next,
                          decoration: const InputDecoration(
                              icon: Icon(
                                Icons.abc_rounded,
                                color: Colors.grey,
                              ),
                              label: Text(
                                'Name',
                                style:
                                    TextStyle(color: Colors.grey, fontSize: 18),
                              ),
                              border: UnderlineInputBorder(
                                borderSide: BorderSide(
                                  color: Colors.grey,
                                ),
                              ),
                              focusedBorder: UnderlineInputBorder(
                                borderSide: BorderSide(color: Colors.grey),
                              ),
                              enabledBorder: UnderlineInputBorder(
                                  borderSide: BorderSide(color: Colors.grey))),
                        ),
                      ),
                      const SizedBox(
                        height: 20,
                      ),
                      Padding(
                        padding: const EdgeInsets.only(left: 30, right: 30),
                        child: TextFormField(
                          style:
                              const TextStyle(color: Colors.grey, fontSize: 20),
                          textInputAction: TextInputAction.next,
                          keyboardType: TextInputType.emailAddress,
                          decoration: const InputDecoration(
                              icon: Icon(
                                Icons.alternate_email_rounded,
                                color: Colors.grey,
                              ),
                              label: Text(
                                'Email ID',
                                style:
                                    TextStyle(color: Colors.grey, fontSize: 18),
                              ),
                              border: UnderlineInputBorder(
                                borderSide: BorderSide(
                                  color: Colors.grey,
                                ),
                              ),
                              focusedBorder: UnderlineInputBorder(
                                borderSide: BorderSide(color: Colors.grey),
                              ),
                              enabledBorder: UnderlineInputBorder(
                                  borderSide: BorderSide(color: Colors.grey))),
                        ),
                      ),
                      const SizedBox(
                        height: 20,
                      ),
                      Padding(
                        padding: const EdgeInsets.only(left: 30, right: 30),
                        child: TextFormField(
                          style:
                              const TextStyle(color: Colors.grey, fontSize: 20),
                          textInputAction: TextInputAction.done,
                          // keyboardType: TextInputType.,
                          obscureText: true,
                          decoration: const InputDecoration(
                              icon: Icon(
                                Icons.lock_open_rounded,
                                color: Colors.grey,
                              ),
                              label: Text(
                                'Enter Password',
                                style:
                                    TextStyle(color: Colors.grey, fontSize: 18),
                              ),
                              border: UnderlineInputBorder(
                                borderSide: BorderSide(
                                  color: Colors.grey,
                                ),
                              ),
                              focusedBorder: UnderlineInputBorder(
                                borderSide: BorderSide(color: Colors.grey),
                              ),
                              enabledBorder: UnderlineInputBorder(
                                  borderSide: BorderSide(color: Colors.grey))),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(
                    height: 10,
                  ),
                  Padding(
                    padding: const EdgeInsets.only(left: 220),
                    child: SizedBox(
                      height: 40,
                      width: 140,
                      child: ElevatedButton(
                        style: ElevatedButton.styleFrom(
                            backgroundColor: const Color(0xFF5e66e0),
                            shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(10))),
                        onPressed: () {
                          // setState(
                          //   () {
                          //     onPressed = !onPressed;
                          //   },
                          // );
                          // showModalBottomSheet(
                          //   isScrollControlled: true,
                          //   context: context,
                          //   builder: (context) {
                          //     return Stack(
                          //       children: [
                          //         Positioned(
                          //             top: -20,
                          //             child: Container(
                          //               padding: EdgeInsets.all(10),
                          //               color: Colors.black,
                          //               child: Icon(
                          //                 Icons.mark_email_read_outlined,
                          //                 color: Colors.white,
                          //               ),
                          //             ))
                          //       ],
                          //     );
                          //   },
                          // );
                          showModalBottomSheet(
                              shape: const RoundedRectangleBorder(
                                  borderRadius: BorderRadius.only(
                                topLeft: Radius.circular(30),
                                topRight: Radius.circular(30),
                              )),
                              isDismissible: true,
                              isScrollControlled: true,
                              context: context,
                              builder: (context) {
                                return Container(
                                  color: Colors.transparent,
                                  child: Column(
                                    mainAxisSize: MainAxisSize.min,
                                    children: [
                                      const SizedBox(
                                        height: 5,
                                      ),
                                      GestureDetector(
                                        onTap: () {
                                          Navigator.pop(context);
                                        },
                                        child: const Icon(
                                          Icons.keyboard_arrow_down_rounded,
                                          color: Colors.grey,
                                          size: 60,
                                        ),
                                      ),
                                      const SizedBox(
                                        height: 30,
                                      ),
                                      Container(
                                        decoration: BoxDecoration(
                                            borderRadius:
                                                BorderRadius.circular(12),
                                            color: const Color(0xFF5e66e0)),
                                        padding: const EdgeInsets.all(23),
                                        child: const Icon(
                                          Icons.mark_email_read_outlined,
                                          color: Colors.white,
                                          size: 40,
                                        ),
                                      ),
                                      const SizedBox(
                                        height: 25,
                                      ),
                                      const Text(
                                        "Check your email",
                                        style: TextStyle(
                                            fontFamily: 'PoppinsSemi',
                                            fontSize: 25),
                                      ),
                                      const SizedBox(
                                        height: 15,
                                      ),
                                      const Column(
                                        children: [
                                          Center(
                                            child: Text(
                                              "We have sent an Auto-generated password ",
                                              style: TextStyle(
                                                  color: Colors.grey,
                                                  fontFamily: 'PoppinsReg',
                                                  fontSize: 18),
                                            ),
                                          ),
                                          Text(
                                            "on your email.",
                                            style: TextStyle(
                                                color: Colors.grey,
                                                fontFamily: 'PoppinsReg',
                                                fontSize: 18),
                                          ),
                                        ],
                                      ),
                                      const SizedBox(
                                        height: 25,
                                      ),
                                      SizedBox(
                                        height: 58,
                                        width: 280,
                                        child: ElevatedButton(
                                          style: ElevatedButton.styleFrom(
                                              backgroundColor:
                                                  const Color(0xFF5e66e0),
                                              shape: RoundedRectangleBorder(
                                                  borderRadius:
                                                      BorderRadius.circular(
                                                          17))),
                                          onPressed: () {
                                            Navigator.pop(context);
                                          },
                                          child: const Text(
                                            "Continue",
                                            style: TextStyle(
                                                fontSize: 23,
                                                color: Colors.white,
                                                fontFamily: 'PoppinsSemi'),
                                          ),
                                        ),
                                      ),
                                      const SizedBox(
                                        height: 50,
                                      ),
                                    ],
                                  ),
                                );
                              });
                        },
                        child: const Text(
                          "Get Password",
                          style: TextStyle(
                              fontSize: 15,
                              color: Colors.white,
                              fontFamily: 'PoppinsSemi'),
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(
                    height: 20,
                  ),
                  SizedBox(
                    height: 58,
                    width: 280,
                    child: ElevatedButton(
                      style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0xFF5e66e0),
                          shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(17))),
                      onPressed: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => const demo(),
                          ),
                        );
                      },
                      child: const Text(
                        "Sign Up",
                        style: TextStyle(
                            fontSize: 23,
                            color: Colors.white,
                            fontFamily: 'PoppinsSemi'),
                      ),
                    ),
                  ),
                  const SizedBox(
                    height: 35,
                  ),
                  // Row(
                  //   children: [
                  //     const Padding(
                  //       padding: EdgeInsets.only(left: 80),
                  //       child: Text(
                  //         "Don't have an account? ",
                  //         style: TextStyle(
                  //             color: Colors.black,
                  //             fontFamily: 'PoppinsReg',
                  //             fontSize: 20),
                  //       ),
                  //     ),
                  //     GestureDetector(
                  //       onTap: () {},
                  //       child: const Text(
                  //         "Sign Up",
                  //         style: TextStyle(
                  //             color: Color(0xFF5e66e0),
                  //             fontFamily: 'PoppinsSemi',
                  //             fontSize: 20),
                  //       ),
                  //     )
                  //   ],
                  // ),
                  // const SizedBox(
                  //   height: 35,
                  // ),
                  Padding(
                    padding: const EdgeInsets.only(left: 45, right: 45),
                    child: Container(
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(10),
                        border: Border.all(
                            color: const Color.fromARGB(172, 158, 158, 158)),
                      ),
                      child: Row(
                        children: [
                          const Column(
                            children: [
                              SizedBox(
                                height: 55,
                              )
                            ],
                          ),
                          const SizedBox(
                            width: 25,
                          ),
                          Image.asset(
                            'assets/images/logo.png',
                            scale: 3,
                          ),
                          const SizedBox(
                            width: 20,
                          ),
                          const Text(
                            "Maharaja Surajmal Institute",
                            style: TextStyle(
                                color: Colors.black,
                                fontFamily: 'PoppinsReg',
                                fontSize: 17),
                          )
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(
                    height: 30,
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}
