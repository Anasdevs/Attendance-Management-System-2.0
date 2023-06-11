import 'package:attendance_management_system/Walkthrough%20Screens/firstScreen.dart';
import 'package:attendance_management_system/Walkthrough%20Screens/fourthScreen.dart';
import 'package:attendance_management_system/Walkthrough%20Screens/secondScreen.dart';
import 'package:attendance_management_system/Walkthrough%20Screens/thirdScreen.dart';
import 'package:flutter/material.dart';
import 'package:smooth_page_indicator/smooth_page_indicator.dart';
import 'package:attendance_management_system/Screens/loginScreen.dart';

class walkthrough extends StatefulWidget {
  const walkthrough({super.key});

  @override
  State<walkthrough> createState() => _walkthroughState();
}

class _walkthroughState extends State<walkthrough> {
  //Controller defined to keep the track of pages
  final PageController _pagecontroller = PageController();
  bool onLastPage = false;
  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (BuildContext context, BoxConstraints constraints) {
        return Scaffold(
          body: Stack(
            children: [
              Container(
                height: constraints.maxHeight * 1.0,
                width: constraints.maxWidth * 1.0,
                child: PageView(
                  controller: _pagecontroller,
                  onPageChanged: (index) {
                    setState(() {
                      onLastPage = (index == 3);
                    });
                  },
                  children: const [
                    firstScreen(),
                    secondScreen(),
                    thirdScreen(),
                    fourthScreen(),
                  ],
                ),
              ),
              Container(
                height: constraints.maxHeight * 1.0,
                width: constraints.maxWidth * 1.0,
                alignment: const Alignment(0, 0.45),
                child: SmoothPageIndicator(
                  controller: _pagecontroller,
                  count: 4,
                  effect: const ExpandingDotsEffect(
                    dotHeight: 10,
                    dotWidth: 10,
                    activeDotColor: Color(0xFF5e66e0),
                    // verticalOffset: 20,
                  ),
                ),
              ),
              Container(
                height: constraints.maxHeight * 1.0,
                width: constraints.maxWidth * 1.0,
                child: Padding(
                  padding: const EdgeInsets.only(top: 600),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      SizedBox(
                        height: 50,
                        width: 90,
                        child: ElevatedButton(
                          style: ElevatedButton.styleFrom(
                            backgroundColor: const Color(0xFF5e66e0),
                            elevation: 7,
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(20),
                            ),
                          ),
                          onPressed: () {
                            _pagecontroller.jumpToPage(3);
                          },
                          child: const Text(
                            "Skip",
                            style: TextStyle(
                              // color: Color(0xFF5e66e0),
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                              fontSize: 20,
                              fontFamily: 'PoppinsSemi',
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(
                        width: 50,
                      ),
                      onLastPage
                          ? SizedBox(
                              height: 50,
                              width: 90,
                              child: ElevatedButton(
                                style: ElevatedButton.styleFrom(
                                  backgroundColor: const Color(0xFF5e66e0),
                                  elevation: 7,
                                  shape: RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(20),
                                  ),
                                ),
                                onPressed: () {
                                  Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                      builder: (context) {
                                        return const loginScreen();
                                      },
                                    ),
                                  );
                                },
                                child: const Text(
                                  "Login",
                                  style: TextStyle(
                                    // color: Color(0xFF5e66e0),
                                    color: Colors.white,
                                    fontWeight: FontWeight.bold,
                                    fontSize: 20,
                                    fontFamily: 'PoppinsSemi',
                                  ),
                                ),
                              ),
                            )
                          : SizedBox(
                              height: 50,
                              width: 90,
                              child: ElevatedButton(
                                style: ElevatedButton.styleFrom(
                                  backgroundColor: const Color(0xFF5e66e0),
                                  elevation: 7,
                                  shape: RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(20),
                                  ),
                                ),
                                onPressed: () {
                                  _pagecontroller.nextPage(
                                      duration:
                                          const Duration(milliseconds: 200),
                                      curve: Curves.easeIn);
                                },
                                child: const Text(
                                  "Next",
                                  style: TextStyle(
                                    // color: Color(0xFF5e66e0),
                                    color: Colors.white,
                                    fontWeight: FontWeight.bold,
                                    fontSize: 20,
                                  ),
                                ),
                              ),
                            )
                    ],
                  ),
                ),
              )
            ],
          ),
        );
      },
    );
  }
}
