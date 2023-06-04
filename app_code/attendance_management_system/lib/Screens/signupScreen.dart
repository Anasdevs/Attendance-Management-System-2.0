import 'package:flutter/material.dart';

class signupScreen extends StatefulWidget {
  const signupScreen({super.key});

  @override
  State<signupScreen> createState() => _signupScreenState();
}

class _signupScreenState extends State<signupScreen> {
  bool onPressed = false;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(
            children: [
              Padding(
                padding: const EdgeInsets.only(left: 40, right: 40),
                child: Image.asset(
                  'assets/images/signup.png',
                  // scale: ,
                ),
              ),
              const Padding(
                padding: EdgeInsets.only(right: 245),
                child: Text(
                  "Sign Up",
                  style: TextStyle(
                      color: Color(0xFF5e66e0),
                      fontSize: 40,
                      fontFamily: 'PoppinsSemi'),
                ),
              ),
              const SizedBox(
                height: 20,
              ),
              Column(
                children: [
                  Padding(
                    padding: const EdgeInsets.only(left: 30, right: 30),
                    child: TextFormField(
                      style: const TextStyle(color: Colors.grey, fontSize: 20),
                      textInputAction: TextInputAction.next,
                      decoration: const InputDecoration(
                          icon: Icon(
                            Icons.abc_rounded,
                            color: Colors.grey,
                          ),
                          label: Text(
                            'Name',
                            style: TextStyle(color: Colors.grey, fontSize: 18),
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
                      style: const TextStyle(color: Colors.grey, fontSize: 20),
                      textInputAction: TextInputAction.next,
                      keyboardType: TextInputType.emailAddress,
                      decoration: const InputDecoration(
                          icon: Icon(
                            Icons.alternate_email_rounded,
                            color: Colors.grey,
                          ),
                          label: Text(
                            'Email ID',
                            style: TextStyle(color: Colors.grey, fontSize: 18),
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
                      style: const TextStyle(color: Colors.grey, fontSize: 20),
                      textInputAction: TextInputAction.done,
                      // keyboardType: TextInputType.,
                      obscureText: true,
                      decoration: const InputDecoration(
                          icon: Icon(
                            Icons.lock_open_rounded,
                            color: Colors.grey,
                          ),
                          label: Text(
                            'Enter Password (Will be sent to your mail).',
                            style: TextStyle(color: Colors.grey, fontSize: 18),
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
                  height: 35,
                  width: 120,
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                        backgroundColor:
                            onPressed ? Color(0xFF5e66e0) : Colors.green,
                        shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(10))),
                    onPressed: () {
                      setState(
                        () {
                          onPressed = !onPressed;
                        },
                      );
                    },
                    child: Text(
                      "Get Password",
                      style: TextStyle(
                          fontSize: 15,
                          color: onPressed ? Colors.white : Colors.black,
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
                  onPressed: () {},
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
                height: 20,
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
                padding: const EdgeInsets.only(left: 60, right: 60),
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
                        width: 20,
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
            ],
          ),
        ),
      ),
    );
  }
}
