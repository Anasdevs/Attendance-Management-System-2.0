import 'package:flutter/material.dart';

class firstScreen extends StatefulWidget {
  const firstScreen({super.key});
  @override
  State<firstScreen> createState() => _firstScreenState();
}

class _firstScreenState extends State<firstScreen>
    with SingleTickerProviderStateMixin {
  late AnimationController _animationController;
  @override
  void initState() {
    _animationController =
        AnimationController(vsync: this, duration: const Duration(minutes: 1));
    super.initState();
  }

  @override
  void dispose() {
    super.dispose();
    _animationController.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Center(
          child: Column(
            children: [
              Padding(
                padding: const EdgeInsets.only(top: 70, left: 30, right: 30),
                child: Image.asset(
                  'assets/images/1.gif',
                  // scale: 0,
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
                height: 40,
              ),
              RichText(
                textAlign: TextAlign.center,
                text: const TextSpan(
                  children: [
                    TextSpan(
                        text:
                            "Check Attendance. Calculate missed\nclasses. See nearing holidays.\n",
                        style: TextStyle(
                          color: Colors.black,
                          fontSize: 17,
                          fontWeight: FontWeight.bold,
                        )),
                    // TextSpan(
                    //     text: "See nearing holidays. \n",
                    //     style: TextStyle(color: Colors.black)),
                    TextSpan(
                        text: "All of it in One place.",
                        style: TextStyle(
                          color: Colors.black,
                          fontSize: 17,
                          fontWeight: FontWeight.bold,
                        )),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
