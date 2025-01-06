import 'package:chord_result_test/data.dart';
import 'package:chord_result_test/detail_page.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(const MainApp());
}

class MainApp extends StatefulWidget {
  const MainApp({super.key});

  @override
  State<MainApp> createState() => _MainAppState();
}

class _MainAppState extends State<MainApp> {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: ListView.builder(
          itemBuilder: (context, index) {
            final Map parsed = parseData[index];

            return ListTile(
              title: Text(parsed['title']),
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => DetailPage(data: parsed),
                  ),
                );
              },
            );
          },
          itemCount: parseData.length,
        ),
      ),
    );
  }
}
