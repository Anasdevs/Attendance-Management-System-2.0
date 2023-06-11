import 'package:flutter/material.dart';

class secondScreen extends StatefulWidget {
  const secondScreen({super.key});

  @override
  State<secondScreen> createState() => _secondScreenState();
}

class _secondScreenState extends State<secondScreen> {
  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (BuildContext context, BoxConstraints constraints) {
        return Scaffold(
          backgroundColor: Colors.white,
          body: SafeArea(
            child: Center(
              child: Container(
                height: constraints.maxHeight * 1.0,
                width: constraints.maxWidth * 0.65,
                child: Column(
                  children: [
                    Padding(
                      padding: const EdgeInsets.only(top: 50),
                      child: Image.asset(
                        'assets/images/2.gif',
                        // scale: 0.59,
                      ),
                    ),
                    // Padding(
                    //   padding:
                    //       const EdgeInsets.only(top: 80, left: 45, right: 45),
                    //   child: Container(
                    //       decoration: BoxDecoration(),
                    //       child: Lottie.asset('assets/animations/Main.json')
                    //       // Lottie.network(
                    //       //   'https://assets10.lottiefiles.com/packages/lf20_3rqwsqnj.json',
                    //       // controller: _animationController,
                    //       // animate: true,
                    //       // ),
                    //       ),
                    // ),
                    const SizedBox(
                      height: 80,
                    ),
                    RichText(
                      textAlign: TextAlign.center,
                      text: const TextSpan(
                        children: [
                          TextSpan(
                            text: "Track attendance",
                            style: TextStyle(
                              color: Colors.black,
                              fontSize: 25,
                              fontWeight: FontWeight.bold,
                              fontFamily: 'PoppinsSemi',
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        );
      },
    );
  }
}
