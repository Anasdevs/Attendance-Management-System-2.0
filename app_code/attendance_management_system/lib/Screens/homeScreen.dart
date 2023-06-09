// import 'package:flutter/material.dart';
// import 'package:google_fonts/google_fonts.dart';

// class homeScreen extends StatefulWidget {
//   const homeScreen({super.key});

//   @override
//   State<homeScreen> createState() => _homeScreenState();
// }

// class _homeScreenState extends State<homeScreen> {
//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       backgroundColor: Colors.white,
//       body: SafeArea(
//         child: SingleChildScrollView(
//           child: Column(
//             children: [
//               const Row(
//                 children: [
//                   Padding(
//                     padding: const EdgeInsets.only(left: 350, top: 20),
//                     child: CircleAvatar(
//                       foregroundImage: AssetImage('assets/images/profile.jpg'),
//                       backgroundColor: Color(0xff5e66e0),
//                     ),
//                   ),
//                 ],
//               ),
//               const SizedBox(
//                 height: 10,
//               ),
//               Padding(
//                 padding: const EdgeInsets.only(top: 10, right: 180),
//                 child: Text(
//                   "Hello 👋 Amanjot ",
//                   style: TextStyle(fontFamily: 'PoppinsSemi', fontSize: 25),
//                 ),
//               ),
//               const SizedBox(
//                 height: 10,
//               ),
//               Container(
//                 decoration: BoxDecoration(
//                     color: Colors.black,
//                     borderRadius: BorderRadius.circular(20)),
//                 padding: EdgeInsets.only(
//                     left: 150, right: 150, top: 150, bottom: 150),
//                 child: Text(
//                   "Hello",
//                   style: GoogleFonts.rubik(color: Colors.white),
//                 ),
//               )
//             ],
//           ),
//         ),
//       ),
//     );
//   }
// }
