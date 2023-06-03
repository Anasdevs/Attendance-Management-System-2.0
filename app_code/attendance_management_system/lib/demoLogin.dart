import 'package:flutter/material.dart';
import 'package:lottie/lottie.dart';

class demoLogin extends StatefulWidget {
  const demoLogin({super.key});

  @override
  State<demoLogin> createState() => _demoLoginState();
}

class _demoLoginState extends State<demoLogin> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        // controller: controller,
        child: Container(
          constraints: BoxConstraints(
            maxHeight: MediaQuery.of(context).size.height,
            maxWidth: MediaQuery.of(context).size.width,
          ),
          decoration: BoxDecoration(
            gradient: LinearGradient(
              colors: [
                Color(0xFF5e66e0),
                Colors.blue.shade400,
              ],
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
            ),
          ),
          child: Column(
            children: [
              const Expanded(
                flex: 2,
                child: Column(
                  children: [
                    Padding(
                      padding: EdgeInsets.only(right: 220, top: 100),
                      child: Text(
                        "Login",
                        style: TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.bold,
                          fontSize: 50,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              Expanded(
                flex: 5,
                child: Container(
                  width: double.infinity,
                  decoration: const BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.only(
                      topLeft: Radius.circular(25),
                      topRight: Radius.circular(25),
                    ),
                  ),
                ),
              ),
              ElevatedButton(
                onPressed: () {},
                child: Lottie.network(
                    'https://lottie.host/ff641fbc-b812-49d0-8d04-bfc1b3304355/Ezw2lf3Rq1.json'),
              )
            ],
          ),
        ),
      ),
    );
  }
}
