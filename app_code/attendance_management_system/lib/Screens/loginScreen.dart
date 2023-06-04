import 'package:attendance_management_system/Screens/signupScreen.dart';
import 'package:flutter/material.dart';

class loginScreen extends StatefulWidget {
  const loginScreen({super.key});

  @override
  State<loginScreen> createState() => _loginScreenState();
}

class _loginScreenState extends State<loginScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(
            children: [
              Image.asset('assets/images/login1.png'),
              const Padding(
                padding: EdgeInsets.only(right: 245),
                child: Text(
                  "Login",
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
                            'Password',
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
                height: 35,
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
                    "Login",
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
              Row(
                children: [
                  const Padding(
                    padding: EdgeInsets.only(left: 80),
                    child: Text(
                      "Don't have an account? ",
                      style: TextStyle(
                          color: Colors.black,
                          fontFamily: 'PoppinsReg',
                          fontSize: 20),
                    ),
                  ),
                  GestureDetector(
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => signupScreen(),
                        ),
                      );
                    },
                    child: const Text(
                      "Sign Up",
                      style: TextStyle(
                          color: Color(0xFF5e66e0),
                          fontFamily: 'PoppinsSemi',
                          fontSize: 20),
                    ),
                  )
                ],
              ),
              const SizedBox(
                height: 35,
              ),
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
